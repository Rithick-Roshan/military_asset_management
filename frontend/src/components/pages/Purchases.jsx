import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Eye, Edit, Trash2, 
  ShoppingCart, Calendar, DollarSign, Package,
  CheckCircle, Clock, AlertTriangle, Building,
  Download, Upload, FileText, Truck
} from 'lucide-react';

const Purchases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedBase, setSelectedBase] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const purchases = [
    {
      id: 1,
      orderNumber: 'PO-2024-001',
      item: 'M4A1 Carbine',
      category: 'Weapons',
      vendor: 'Colt Defense LLC',
      vendorContact: 'sales@coltdefense.com',
      base: 'Fort Liberty',
      quantity: 50,
      unitPrice: 800,
      totalAmount: 40000,
      orderDate: '2024-01-15',
      expectedDelivery: '2024-02-15',
      actualDelivery: '2024-02-12',
      status: 'Delivered',
      approvedBy: 'Gen. Smith',
      requestedBy: 'Col. Johnson',
      urgency: 'Standard',
      contractNumber: 'CNT-2024-001',
      notes: 'Standard procurement for training unit',
      deliveryAddress: 'Fort Liberty Armory, Building 123',
      paymentStatus: 'Paid',
      invoiceNumber: 'INV-2024-001'
    },
    {
      id: 2,
      orderNumber: 'PO-2024-002',
      item: 'Night Vision Goggles',
      category: 'Electronics',
      vendor: 'L3Harris Technologies',
      vendorContact: 'orders@l3harris.com',
      base: 'Camp Pendleton',
      quantity: 25,
      unitPrice: 3500,
      totalAmount: 87500,
      orderDate: '2024-02-10',
      expectedDelivery: '2024-03-20',
      actualDelivery: null,
      status: 'In Production',
      approvedBy: 'Col. Brown',
      requestedBy: 'Maj. Wilson',
      urgency: 'High',
      contractNumber: 'CNT-2024-002',
      notes: 'Latest generation NVGs for special operations',
      deliveryAddress: 'Camp Pendleton Supply Depot',
      paymentStatus: 'Pending',
      invoiceNumber: null
    },
    {
      id: 3,
      orderNumber: 'PO-2024-003',
      item: 'Humvee',
      category: 'Vehicles',
      vendor: 'AM General',
      vendorContact: 'military@amgeneral.com',
      base: 'JBLM',
      quantity: 10,
      unitPrice: 150000,
      totalAmount: 1500000,
      orderDate: '2024-02-01',
      expectedDelivery: '2024-04-01',
      actualDelivery: null,
      status: 'Approved',
      approvedBy: 'Gen. Davis',
      requestedBy: 'Col. Anderson',
      urgency: 'Standard',
      contractNumber: 'CNT-2024-003',
      notes: 'Fleet replacement vehicles with latest armor upgrades',
      deliveryAddress: 'JBLM Motor Pool Complex',
      paymentStatus: 'Approved',
      invoiceNumber: null
    },
    {
      id: 4,
      orderNumber: 'PO-2024-004',
      item: '5.56mm Ammunition',
      category: 'Ammunition',
      vendor: 'Federal Premium',
      vendorContact: 'gov.sales@federalpremium.com',
      base: 'Fort Hood',
      quantity: 10000,
      unitPrice: 0.75,
      totalAmount: 7500,
      orderDate: '2024-01-20',
      expectedDelivery: '2024-02-05',
      actualDelivery: '2024-02-03',
      status: 'Delivered',
      approvedBy: 'Maj. Taylor',
      requestedBy: 'Capt. Miller',
      urgency: 'Standard',
      contractNumber: 'CNT-2024-004',
      notes: 'Training ammunition for quarterly exercises',
      deliveryAddress: 'Fort Hood Ammunition Storage Area',
      paymentStatus: 'Paid',
      invoiceNumber: 'INV-2024-004'
    },
    {
      id: 5,
      orderNumber: 'PO-2024-005',
      item: 'Medical Equipment',
      category: 'Medical',
      vendor: 'Medical Solutions Inc',
      vendorContact: 'orders@medsolutions.com',
      base: 'Fort Liberty',
      quantity: 100,
      unitPrice: 150,
      totalAmount: 15000,
      orderDate: '2024-03-05',
      expectedDelivery: '2024-03-25',
      actualDelivery: null,
      status: 'Pending Approval',
      approvedBy: null,
      requestedBy: 'Dr. Thompson',
      urgency: 'High',
      contractNumber: null,
      notes: 'Emergency medical supplies for field hospital',
      deliveryAddress: 'Fort Liberty Medical Center',
      paymentStatus: 'Pending',
      invoiceNumber: null
    }
  ];

  const categories = ['All', 'Weapons', 'Vehicles', 'Ammunition', 'Electronics', 'Communications', 'Medical'];
  const bases = ['All', 'Fort Liberty', 'Camp Pendleton', 'JBLM', 'Fort Hood'];
  const statuses = ['All', 'Pending Approval', 'Approved', 'Ordered', 'In Production', 'Shipped', 'Delivered', 'Cancelled'];

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || purchase.status === selectedStatus;
    const matchesBase = selectedBase === 'All' || purchase.base === selectedBase;
    const matchesCategory = selectedCategory === 'All' || purchase.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesBase && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Ordered': return 'bg-purple-100 text-purple-800';
      case 'In Production': return 'bg-indigo-100 text-indigo-800';
      case 'Shipped': return 'bg-orange-100 text-orange-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Standard': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending Approval': return <Clock className="w-4 h-4" />;
      case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'Shipped': return <Truck className="w-4 h-4" />;
      case 'Cancelled': return <AlertTriangle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusCounts = () => {
    return {
      pending: purchases.filter(p => p.status === 'Pending Approval').length,
      approved: purchases.filter(p => p.status === 'Approved').length,
      inProduction: purchases.filter(p => p.status === 'In Production').length,
      delivered: purchases.filter(p => p.status === 'Delivered').length
    };
  };

  const getTotalValue = () => {
    return purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0);
  };

  const statusCounts = getStatusCounts();
  const totalValue = getTotalValue();

  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Purchase Orders</h2>
            <p className="text-gray-600 mt-1">Manage procurement and vendor relationships</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="w-4 h-4" />
              Reports
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              New Purchase Order
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-xl font-bold text-gray-900">{statusCounts.approved}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Package className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Production</p>
              <p className="text-xl font-bold text-gray-900">{statusCounts.inProduction}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Delivered</p>
              <p className="text-xl font-bold text-gray-900">{statusCounts.delivered}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-xl font-bold text-gray-900">${(totalValue / 1000000).toFixed(1)}M</p>
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
                placeholder="Search by item, PO number, or vendor..."
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

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Purchases Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor & Base
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity & Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Timeline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Personnel & Payment
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPurchases.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-gray-50">
                  
                  {/* Order Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <ShoppingCart className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{purchase.item}</div>
                        <div className="text-sm text-blue-600">{purchase.orderNumber}</div>
                        <div className="text-xs text-gray-400">{purchase.category}</div>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full mt-1 ${getUrgencyColor(purchase.urgency)}`}>
                          {purchase.urgency}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Vendor & Base */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Building className="w-3 h-3 text-gray-400" />
                        <span className="font-medium text-gray-900">{purchase.vendor}</span>
                      </div>
                      <div className="text-sm text-gray-600">{purchase.vendorContact}</div>
                      <div className="text-sm text-blue-600">{purchase.base}</div>
                    </div>
                  </td>

                  {/* Quantity & Cost */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">
                        {purchase.quantity.toLocaleString()} units
                      </div>
                      <div className="text-sm text-gray-600">
                        ${purchase.unitPrice.toLocaleString()} per unit
                      </div>
                      <div className="font-semibold text-green-600">
                        ${purchase.totalAmount.toLocaleString()} total
                      </div>
                    </div>
                  </td>

                  {/* Status & Timeline */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(purchase.status)}`}>
                          {getStatusIcon(purchase.status)}
                          {purchase.status}
                        </span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="w-3 h-3" />
                          Ordered: {purchase.orderDate}
                        </div>
                        {purchase.actualDelivery ? (
                          <div className="text-green-600">
                            Delivered: {purchase.actualDelivery}
                          </div>
                        ) : (
                          <div className="text-orange-600">
                            Expected: {purchase.expectedDelivery}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Personnel & Payment */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="text-sm">
                        <div className="text-gray-600">Requested: {purchase.requestedBy}</div>
                        {purchase.approvedBy && (
                          <div className="text-green-600">Approved: {purchase.approvedBy}</div>
                        )}
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getPaymentStatusColor(purchase.paymentStatus)}`}>
                        {purchase.paymentStatus}
                      </span>
                      {purchase.invoiceNumber && (
                        <div className="text-xs text-blue-600">
                          Invoice: {purchase.invoiceNumber}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      {purchase.status === 'Pending Approval' && (
                        <button className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors" title="Approve">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-1 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded transition-colors" title="Download Invoice">
                        <Download className="w-4 h-4" />
                      </button>
                      {purchase.status === 'Pending Approval' && (
                        <button className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors" title="Cancel">
                          <Trash2 className="w-4 h-4" />
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
              Showing {filteredPurchases.length} of {purchases.length} purchase orders
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

      {/* Recent Purchase Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Vendors</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Array.from(new Set(purchases.map(p => p.vendor))).slice(0, 5).map((vendor) => {
                const vendorPurchases = purchases.filter(p => p.vendor === vendor);
                const totalValue = vendorPurchases.reduce((sum, p) => sum + p.totalAmount, 0);
                return (
                  <div key={vendor} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{vendor}</p>
                      <p className="text-sm text-gray-600">{vendorPurchases.length} orders</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${totalValue.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Total Value</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Delivery Performance</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {purchases.filter(p => p.actualDelivery).slice(0, 5).map((purchase) => {
                const expectedDate = new Date(purchase.expectedDelivery);
                const actualDate = new Date(purchase.actualDelivery);
                const diffDays = Math.ceil((actualDate - expectedDate) / (1000 * 60 * 60 * 24));
                const isOnTime = diffDays <= 0;
                
                return (
                  <div key={purchase.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{purchase.item}</p>
                      <p className="text-sm text-gray-600">{purchase.orderNumber}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        isOnTime ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isOnTime ? `${Math.abs(diffDays)} days early` : `${diffDays} days late`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchases;