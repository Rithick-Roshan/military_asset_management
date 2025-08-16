import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Eye, Edit, Trash2, 
  Package, MapPin, Calendar, User, AlertTriangle,
  CheckCircle, Clock, Download, Upload
} from 'lucide-react';

const Assets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBase, setSelectedBase] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const assets = [
    {
      id: 1,
      serialNumber: 'M4-2024-001',
      name: 'M4A1 Carbine',
      category: 'Weapons',
      subcategory: 'Rifles',
      base: 'Fort Liberty',
      quantity: 150,
      assigned: 120,
      available: 30,
      status: 'Available',
      condition: 'Excellent',
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-05-15',
      purchaseDate: '2024-01-15',
      value: 800,
      assignedTo: null
    },
    {
      id: 2,
      serialNumber: 'HV-2024-001',
      name: 'Humvee',
      category: 'Vehicles',
      subcategory: 'Tactical Vehicles',
      base: 'Fort Liberty',
      quantity: 25,
      assigned: 20,
      available: 5,
      status: 'Assigned',
      condition: 'Good',
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-06-01',
      purchaseDate: '2024-02-01',
      value: 150000,
      assignedTo: 'Alpha Company'
    },
    {
      id: 3,
      serialNumber: 'AM-2024-001',
      name: '5.56mm Ammunition',
      category: 'Ammunition',
      subcategory: 'Rifle Rounds',
      base: 'Camp Pendleton',
      quantity: 5000,
      assigned: 0,
      available: 5000,
      status: 'Available',
      condition: 'Excellent',
      lastMaintenance: null,
      nextMaintenance: null,
      purchaseDate: '2024-01-20',
      value: 0.75,
      assignedTo: null
    },
    {
      id: 4,
      serialNumber: 'NV-2024-001',
      name: 'Night Vision Goggles',
      category: 'Electronics',
      subcategory: 'Optics',
      base: 'JBLM',
      quantity: 50,
      assigned: 35,
      available: 15,
      status: 'Available',
      condition: 'Good',
      lastMaintenance: '2024-02-20',
      nextMaintenance: '2024-08-20',
      purchaseDate: '2024-02-10',
      value: 3500,
      assignedTo: null
    },
    {
      id: 5,
      serialNumber: 'RD-2024-001',
      name: 'Radio Set',
      category: 'Communications',
      subcategory: 'Tactical Radio',
      base: 'Fort Hood',
      quantity: 100,
      assigned: 80,
      available: 20,
      status: 'Under Maintenance',
      condition: 'Fair',
      lastMaintenance: '2024-03-10',
      nextMaintenance: '2024-04-10',
      purchaseDate: '2024-01-25',
      value: 2500,
      assignedTo: null
    }
  ];

  const categories = ['All', 'Weapons', 'Vehicles', 'Ammunition', 'Electronics', 'Communications', 'Medical'];
  const bases = ['All', 'Fort Liberty', 'Camp Pendleton', 'JBLM', 'Fort Hood'];
  const statuses = ['All', 'Available', 'Assigned', 'Under Maintenance', 'Decommissioned'];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
    const matchesBase = selectedBase === 'All' || asset.base === selectedBase;
    const matchesStatus = selectedStatus === 'All' || asset.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesBase && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Assigned': return 'bg-blue-100 text-blue-800';
      case 'Under Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Decommissioned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Fair': return 'text-yellow-600';
      case 'Poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getMaintenanceStatus = (nextMaintenance) => {
    if (!nextMaintenance) return null;
    const next = new Date(nextMaintenance);
    const now = new Date();
    const daysUntil = Math.ceil((next - now) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) return { status: 'overdue', color: 'text-red-600', text: 'Overdue' };
    if (daysUntil <= 30) return { status: 'due', color: 'text-yellow-600', text: `Due in ${daysUntil}d` };
    return { status: 'scheduled', color: 'text-green-600', text: `${daysUntil}d` };
  };

  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Asset Inventory</h2>
            <p className="text-gray-600 mt-1">Manage and track all military assets across bases</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              Add Asset
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Assets</p>
              <p className="text-xl font-bold text-gray-900">{assets.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-xl font-bold text-gray-900">
                {assets.filter(a => a.status === 'Available').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <User className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Assigned</p>
              <p className="text-xl font-bold text-gray-900">
                {assets.filter(a => a.status === 'Assigned').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Maintenance Due</p>
              <p className="text-xl font-bold text-gray-900">
                {assets.filter(a => {
                  if (!a.nextMaintenance) return false;
                  const maintenance = getMaintenanceStatus(a.nextMaintenance);
                  return maintenance && (maintenance.status === 'due' || maintenance.status === 'overdue');
                }).length}
              </p>
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
                placeholder="Search assets by name or serial number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

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

          {/* Base Filter */}
          <select
            value={selectedBase}
            onChange={(e) => setSelectedBase(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {bases.map(base => (
              <option key={base} value={base}>{base}</option>
            ))}
          </select>

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

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location & Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Maintenance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map((asset) => {
                const maintenanceStatus = getMaintenanceStatus(asset.nextMaintenance);
                return (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    
                    {/* Asset Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Package className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{asset.name}</div>
                          <div className="text-sm text-gray-500">{asset.serialNumber}</div>
                          <div className="text-xs text-gray-400">{asset.subcategory}</div>
                        </div>
                      </div>
                    </td>

                    {/* Location & Status */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          {asset.base}
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(asset.status)}`}>
                          {asset.status}
                        </span>
                        {asset.assignedTo && (
                          <div className="text-xs text-gray-500">
                            Assigned to: {asset.assignedTo}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">{asset.quantity} total</div>
                        <div className="text-sm text-gray-600">
                          <span className="text-green-600">{asset.available} available</span>
                          {asset.assigned > 0 && (
                            <span className="text-blue-600 ml-2">{asset.assigned} assigned</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Condition */}
                    <td className="px-6 py-4">
                      <div className={`font-medium ${getConditionColor(asset.condition)}`}>
                        {asset.condition}
                      </div>
                    </td>

                    {/* Maintenance */}
                    <td className="px-6 py-4">
                      {maintenanceStatus ? (
                        <div>
                          <div className={`text-sm font-medium ${maintenanceStatus.color}`}>
                            {maintenanceStatus.text}
                          </div>
                          <div className="text-xs text-gray-500">
                            Next: {asset.nextMaintenance}
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </td>

                    {/* Value */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        ${(asset.value * asset.quantity).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${asset.value}/unit
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {filteredAssets.length} of {assets.length} assets
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

export default Assets;