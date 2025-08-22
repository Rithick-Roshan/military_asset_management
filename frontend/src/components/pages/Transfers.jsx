import React, { useEffect, useState } from 'react';
import { 
  Plus, Search, Filter, Eye, Edit, MapPin, Package, 
  CheckCircle, Clock, AlertTriangle, ArrowRight,
  Truck
} from 'lucide-react';
import axios from 'axios'; 

const Transfers = ({setCurrentPage,user,api}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedFromBase, setSelectedFromBase] = useState('All');
  const [selectedToBase, setSelectedToBase] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [transferData, setTransferData] = useState([]);
  const [baseData,setBaseData]=useState([]);

const takeTransferData = async () => {
  try {
    const response = await axios.get(`${api}/transfer/getall`);
    if (response.status === 200) {
      setTransferData(response.data);
      console.log("Transfer data fetched successfully", response.data[0]?.asset_name);
    }
    
    const responsebase = await axios.get(`${api}/user/getbases`)
    if(responsebase.status===200){
      setBaseData(responsebase.data);
      console.log("Base data fetched sucessfully"+responsebase.data);
    }
    
  } catch (err) {
    console.log("Failed to fetch transfer data", err);
    // setTransferData(sampleTransfers); 
  }
};


  useEffect(() => {
    takeTransferData();
  }, []);

  useEffect(() => {
    console.log("backend transfer data", transferData[0]?.asset_name);
  }, [transferData]);



  const categories = ['All', 'Weapons', 'Vehicles', 'Ammunition', 'Electronics', 'Communications', 'Medical', 'Others'];
  const bases = ['All', 'Fort Liberty', 'Camp Pendleton', 'JBLM', 'Fort Hood'];
  const statuses = ['All', 'Pending', 'In Transit', 'Completed', 'Failed'];

  const filteredTransfers = transferData.filter(transfer => {
      console.log("asset name :"+transfer.asset_name);
    const matchesSearch = transfer.asset_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || transfer.transfer_status === selectedStatus;
    const matchesFromBase = selectedFromBase === 'All' || transfer.from_base_name === selectedFromBase;
    const matchesToBase = selectedToBase === 'All' || transfer.to_base_name === selectedToBase;
    const matchesCategory = selectedCategory === 'All' || transfer.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesFromBase && matchesToBase && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'In Transit': return <Truck className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Failed': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusCounts = () => {
    return {
      pending: transferData.filter(t => t.transfer_status === 'Pending').length,
      inTransit: transferData.filter(t => t.transfer_status === 'In Transit').length,
      completed: transferData.filter(t => t.transfer_status === 'Completed').length,
      Failed: transferData.filter(t => t.stattransfer_statusus === 'Failed').length
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
          {user?.role!=="Admin" && (
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleAddTransfer}
            >
              <Plus className="w-4 h-4" />
              New Transfer
            </button>
          </div>
          )}
        </div>
      </div>
      {user?.role!=="Base_Commander" && (
      <>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-gray-900">{transferData.filter(data=> data.transfer_status==="Pending").length}</p>
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
              <p className="text-xl font-bold text-gray-900">{transferData.filter(data=> data.transfer_status==="In_Transit").length}</p>
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
              <p className="text-xl font-bold text-gray-900">{transferData.filter(data=> data.transfer_status==="Completed").length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-xl font-bold text-gray-900">{transferData.filter(data=> data.transfer_status==="Failed").length}</p>
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
            {baseData.map(base => (
              <option key={base.base_name} value={base.base_name}>From: {base.base_name}</option>
            ))}
          </select>

          {/* To Base Filter */}
          <select
            value={selectedToBase}
            onChange={(e) => setSelectedToBase(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {baseData.map(base => (
              <option key={base.base_name} value={base.base_name}>To: {base.base_name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Transfers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransfers.map((transfer) => (
                <tr key={transfer.transfer_id} className="hover:bg-gray-50">

                  {/* Asset Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Package className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{transfer.asset_name}</div>
                        <div className="text-xs text-gray-500">{transfer.asset_serial_number}</div>
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
                          <span className="text-gray-900">{transfer.from_base_name}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-blue-500" />
                          <span className="text-gray-900">{transfer.to_base_name}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(transfer.status)}`}>
                      {getStatusIcon(transfer.transfer_status)}
                      {transfer.transfer_status}
                    </span>
                  </td>

                  {/* Quantity */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {transfer.transfer_value}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(transfer.transfer_date).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Actions */}

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">

        </div>
      </div>
      </>
      )}
      {user?.role==="Base_Commander" && (
      <>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-gray-900">{transferData.filter(transfer => user && transfer.from_base_id === user.base_id).filter(data=> data.transfer_status==="Pending").length}</p>
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
              <p className="text-xl font-bold text-gray-900">{transferData.filter(transfer => user && transfer.from_base_id === user.base_id).filter(data=> data.transfer_status==="In_Transit").length}</p>
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
              <p className="text-xl font-bold text-gray-900">{transferData.filter(transfer => user && transfer.from_base_id === user.base_id).filter(data=> data.transfer_status==="Completed").length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-xl font-bold text-gray-900">{transferData.filter(transfer => user && transfer.from_base_id === user.base_id).filter(data=> data.transfer_status==="Failed").length}</p>
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
            {baseData.map(base => (
              <option key={base.base_name} value={base.base_name}>From: {base.base_name}</option>
            ))}
          </select>

          {/* To Base Filter */}
          <select
            value={selectedToBase}
            onChange={(e) => setSelectedToBase(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {baseData.map(base => (
              <option key={base.base_name} value={base.base_name}>To: {base.base_name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Transfers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransfers.filter(transfer => transfer.from_base_id === user.base_id).map((transfer) => (
                <tr key={transfer.transfer_id} className="hover:bg-gray-50">

                  {/* Asset Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Package className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{transfer.asset_name}</div>
                        <div className="text-xs text-gray-500">{transfer.asset_serial_number}</div>
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
                          <span className="text-gray-900">{transfer.from_base_name}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-blue-500" />
                          <span className="text-gray-900">{transfer.to_base_name}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(transfer.status)}`}>
                      {getStatusIcon(transfer.transfer_status)}
                      {transfer.transfer_status}
                    </span>
                  </td>

                  {/* Quantity */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {transfer.transfer_value}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(transfer.transfer_date).toLocaleDateString()}
                    </div>
                  </td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">

        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default Transfers;