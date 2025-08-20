import React, { useEffect, useState } from 'react';
import { 
  Plus, Search, Filter, Eye, Edit, RotateCcw, 
  Users, Calendar, MapPin, Package, 
  CheckCircle, Clock, AlertTriangle, User,
  Download, Upload, Badge, Shield, ArrowRight,
  Truck, Send, RefreshCw
} from 'lucide-react';
// import axios from 'axios'; // Commented out for artifact demo

const Transfers = ({setCurrentPage}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedFromBase, setSelectedFromBase] = useState('All');
  const [selectedToBase, setSelectedToBase] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [transferData, setTransferData] = useState([]);

  const takeTransferData = async () => {
    try {
      // const response = await axios.get("http://localhost:3000/transfer/getall");
      // if (response.status === 200) {
      //   setTransferData(response.data);
      //   console.log("Transfer data fetched successfully", response.data);
      // }
      
      // For demo purposes, using sample data
      setTransferData(sampleTransfers);
    } catch (err) {
      console.log("Failed to fetch transfer data", err);
    }
  };

  useEffect(() => {
    takeTransferData();
  }, []);

  useEffect(() => {
    console.log(transferData);
  }, [transferData]);

  // Sample data for demonstration (replace with actual data structure when API is ready)
  const sampleTransfers = [
    {
      id: 1,
      transferId: 'TRF-2024-001',
      asset: 'M4A1 Carbine',
      serialNumber: 'M4-2024-001',
      category: 'Weapons',
      fromBase: 'Fort Liberty',
      toBase: 'Camp Pendleton',
      status: 'Pending',
      transferDate: '2024-03-15',
      quantity: 5,
      initiatedBy: 'Lt. Col. Johnson',
      approvedBy: null,
      notes: 'Transfer for training exercise',
      assetId: 1
    },
    {
      id: 2,
      transferId: 'TRF-2024-002',
      asset: 'Humvee',
      serialNumber: 'HV-2024-005',
      category: 'Vehicles',
      fromBase: 'Camp Pendleton',
      toBase: 'JBLM',
      status: 'In Transit',
      transferDate: '2024-03-12',
      quantity: 2,
      initiatedBy: 'Maj. Davis',
      approvedBy: 'Col. Smith',
      notes: 'Urgent deployment requirement',
      assetId: 2
    },
    {
      id: 3,
      transferId: 'TRF-2024-003',
      asset: 'Medical Kit',
      serialNumber: 'MED-2024-030',
      category: 'Medical',
      fromBase: 'Fort Hood',
      toBase: 'Fort Liberty',
      status: 'Completed',
      transferDate: '2024-03-08',
      quantity: 10,
      initiatedBy: 'Capt. Anderson',
      approvedBy: 'Maj. Wilson',
      notes: 'Medical supplies restocking',
      assetId: 3
    },
    {
      id: 4,
      transferId: 'TRF-2024-004',
      asset: 'Radio Set',
      serialNumber: 'RD-2024-012',
      category: 'Communications',
      fromBase: 'JBLM',
      toBase: 'Fort Hood',
      status: 'Rejected',
      transferDate: '2024-03-10',
      quantity: 3,
      initiatedBy: 'Sgt. Miller',
      approvedBy: null,
      notes: 'Insufficient justification provided',
      assetId: 4
    }
  ];

  const categories = ['All', 'Weapons', 'Vehicles', 'Ammunition', 'Electronics', 'Communications', 'Medical', 'Others'];
  const bases = ['All', 'Fort Liberty', 'Camp Pendleton', 'JBLM', 'Fort Hood'];
  const statuses = ['All', 'Pending', 'In Transit', 'Completed', 'Rejected'];

  const filteredTransfers = sampleTransfers.filter(transfer => {
    const matchesSearch = transfer.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.transferId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || transfer.status === selectedStatus;
    const matchesFromBase = selectedFromBase === 'All' || transfer.fromBase === selectedFromBase;
    const matchesToBase = selectedToBase === 'All' || transfer.toBase === selectedToBase;
    const matchesCategory = selectedCategory === 'All' || transfer.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesFromBase && matchesToBase && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'In Transit': return <Truck className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Rejected': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusCounts = () => {
    return {
      pending: sampleTransfers.filter(t => t.status === 'Pending').length,
      inTransit: sampleTransfers.filter(t => t.status === 'In Transit').length,
      completed: sampleTransfers.filter(t => t.status === 'Completed').length,
      rejected: sampleTransfers.filter(t => t.status === 'Rejected').length
    };
  };

  const handleAddTransfer = () => {
    setCurrentPage("addTransfer");
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Asset Transfers</h2>
            <p className="text-gray-600 mt-1">Manage asset transfers between bases</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleAddTransfer}
            >
              <Plus className="w-4 h-4" />
              New Transfer
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-gray-900">{statusCounts.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Transit</p>
              <p className="text-xl font-bold text-gray-900">{statusCounts.inTransit}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-xl font-bold text-gray-900">{statusCounts.completed}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-xl font-bold text-gray-900">{statusCounts.rejected}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by asset, transfer ID, or serial number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* From Base Filter */}
          <select
            value={selectedFromBase}
            onChange={(e) => setSelectedFromBase(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {bases.map(base => (
              <option key={base} value={base}>From: {base}</option>
            ))}
          </select>

          {/* To Base Filter */}
          <select
            value={selectedToBase}
            onChange={(e) => setSelectedToBase(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {bases.map(base => (
              <option key={base} value={base}>To: {base}</option>
            ))}
          </select>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Transfers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transfer ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transfer Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransfers.map((transfer) => (
                <tr key={transfer.id} className="hover:bg-gray-50">
                  
                  {/* Transfer ID */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="font-medium text-blue-600">{transfer.transferId}</div>
                      <div className="text-xs text-gray-500">Initiated by: {transfer.initiatedBy}</div>
                      {transfer.approvedBy && (
                        <div className="text-xs text-green-600">Approved by: {transfer.approvedBy}</div>
                      )}
                    </div>
                  </td>

                  {/* Asset Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Package className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{transfer.asset}</div>
                        <div className="text-xs text-gray-500">{transfer.serialNumber}</div>
                        <div className="text-xs text-gray-400">{transfer.category}</div>
                      </div>
                    </div>
                  </td>

                  {/* Transfer Route */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-900">{transfer.fromBase}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-blue-500" />
                          <span className="text-gray-900">{transfer.toBase}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(transfer.status)}`}>
                      {getStatusIcon(transfer.status)}
                      {transfer.status}
                    </span>
                  </td>

                  {/* Quantity */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {transfer.quantity}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(transfer.transferDate).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      {transfer.status === 'Pending' && (
                        <button className="p-1 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded transition-colors" title="Edit Transfer">
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {transfer.status === 'In Transit' && (
                        <button className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors" title="Mark as Received">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {filteredTransfers.length} of {sampleTransfers.length} transfers
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-white transition-colors">
                Previous
              </button>
              <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</span>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-white transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfers;