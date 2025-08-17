import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Eye, Edit, Trash2, 
  DollarSign, Calendar, Package, User,
  CheckCircle, Clock, AlertTriangle, Target,
  Download, Upload, FileText, TrendingUp
} from 'lucide-react';

const Expenditures = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBase, setSelectedBase] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedOperation, setSelectedOperation] = useState('All');

  const expenditures = [
    {
      id: 1,
      expenditureId: 'EXP-2024-001',
      item: '5.56mm Ammunition',
      category: 'Ammunition',
      base: 'Fort Liberty',
      quantityExpended: 1000,
      unit: 'Rounds',
      expenditureDate: '2024-03-13',
      reason: 'Quarterly Marksmanship Training',
      operationName: 'Operation Sharp Shooter',
      authorizedBy: 'Col. Davis',
      recordedBy: 'Sgt. Johnson',
      unitCost: 0.75,
      totalCost: 750,
      assetId: 'AM-2024-001',
      personnel: 'Alpha Company',
      location: 'Range Complex 1',
      approvalDate: '2024-03-12',
      isRecoverable: false,
      notes: 'Standard quarterly training expenditure',
      budgetCode: 'TRG-2024-Q1'
    },
    {
      id: 2,
      expenditureId: 'EXP-2024-002',
      item: '9mm Ammunition',
      category: 'Ammunition',
      base: 'Camp Pendleton',
      quantityExpended: 500,
      unit: 'Rounds',
      expenditureDate: '2024-03-12',
      reason: 'Qualification Range Exercise',
      operationName: 'Pistol Qualification 2024',
      authorizedBy: 'Maj. Wilson',
      recordedBy: 'Cpl. Martinez',
      unitCost: 0.85,
      totalCost: 425,
      assetId: 'AM-2024-002',
      personnel: 'Military Police Unit',
      location: 'Pistol Range A',
      approvalDate: '2024-03-11',
      isRecoverable: false,
      notes: 'Annual qualification requirement',
      budgetCode: 'QUAL-2024'
    },
    {
      id: 3,
      expenditureId: 'EXP-2024-003',
      item: 'Medical Supplies',
      category: 'Medical',
      base: 'JBLM',
      quantityExpended: 25,
      unit: 'Kits',
      expenditureDate: '2024-03-10',
      reason: 'Combat Medic Training Exercise',
      operationName: 'Lifeline Training 2024',
      authorizedBy: 'Dr. Anderson',
      recordedBy: 'Medic Thompson',
      unitCost: 45,
      totalCost: 1125,
      assetId: 'MED-2024-001',
      personnel: 'Medical Corps Trainees',
      location: 'Medical Training Facility',
      approvalDate: '2024-03-09',
      isRecoverable: false,
      notes: 'Single-use medical training supplies',
      budgetCode: 'MED-TRG-2024'
    },
    {
      id: 4,
      expenditureId: 'EXP-2024-004',
      item: 'Fuel (Diesel)',
      category: 'Logistics',
      base: 'Fort Hood',
      quantityExpended: 500,
      unit: 'Gallons',
      expenditureDate: '2024-03-08',
      reason: 'Vehicle Training Operations',
      operationName: 'Convoy Exercise Alpha',
      authorizedBy: 'Lt. Col. Brown',
      recordedBy: 'Sgt. Davis',
      unitCost: 3.25,
      totalCost: 1625,
      assetId: 'FUEL-2024-001',
      personnel: 'Transportation Company',
      location: 'Motor Pool Complex',
      approvalDate: '2024-03-07',
      isRecoverable: false,
      notes: 'Fuel consumed during convoy training',
      budgetCode: 'VEH-OPS-2024'
    },
    {
      id: 5,
      expenditureId: 'EXP-2024-005',
      item: 'Pyrotechnics',
      category: 'Training Aids',
      base: 'Fort Liberty',
      quantityExpended: 50,
      unit: 'Units',
      expenditureDate: '2024-03-15',
      reason: 'Tactical Training Exercise',
      operationName: 'Thunder Strike 2024',
      authorizedBy: 'Gen. Smith',
      recordedBy: 'Lt. Wilson',
      unitCost: 12.50,
      totalCost: 625,
      assetId: 'PYR-2024-001',
      personnel: 'Special Operations Unit',
      location: 'Training Area Charlie',
      approvalDate: '2024-03-14',
      isRecoverable: false,
      notes: 'Simulation pyrotechnics for realistic training',
      budgetCode: 'SOF-TRG-2024'
    },
    {
      id: 6,
      expenditureId: 'EXP-2024-006',
      item: 'Rations (MRE)',
      category: 'Subsistence',
      base: 'Camp Pendleton',
      quantityExpended: 200,
      unit: 'Meals',
      expenditureDate: '2024-03-14',
      reason: 'Field Training Exercise',
      operationName: 'Desert Warrior 2024',
      authorizedBy: 'Col. Rodriguez',
      recordedBy: 'Supply Sgt. Kim',
      unitCost: 8.75,
      totalCost: 1750,
      assetId: 'MRE-2024-001',
      personnel: 'Infantry Battalion',
      location: 'Field Training Area',
      approvalDate: '2024-03-13',
      isRecoverable: false,
      notes: 'Field rations for 3-day training exercise',
      budgetCode: 'FLD-EX-2024'
    }
  ];

  const categories = ['All', 'Ammunition', 'Medical', 'Logistics', 'Training Aids', 'Subsistence', 'Electronics'];
  const bases = ['All', 'Fort Liberty', 'Camp Pendleton', 'JBLM', 'Fort Hood'];
  const operations = ['All', ...Array.from(new Set(expenditures.map(e => e.operationName)))];

  const filteredExpenditures = expenditures.filter(expenditure => {
    const matchesSearch = expenditure.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expenditure.expenditureId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expenditure.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBase = selectedBase === 'All' || expenditure.base === selectedBase;
    const matchesCategory = selectedCategory === 'All' || expenditure.category === selectedCategory;
    const matchesOperation = selectedOperation === 'All' || expenditure.operationName === selectedOperation;
    
    return matchesSearch && matchesBase && matchesCategory && matchesOperation;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Ammunition': return 'bg-red-100 text-red-800';
      case 'Medical': return 'bg-green-100 text-green-800';
      case 'Logistics': return 'bg-blue-100 text-blue-800';
      case 'Training Aids': return 'bg-purple-100 text-purple-800';
      case 'Subsistence': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecoverableColor = (isRecoverable) => {
    return isRecoverable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getTotalExpenditures = () => {
    return filteredExpenditures.reduce((sum, exp) => sum + exp.totalCost, 0);
  };

  const getCategoryTotals = () => {
    const totals = {};
    expenditures.forEach(exp => {
      if (!totals[exp.category]) {
        totals[exp.category] = { count: 0, total: 0 };
      }
      totals[exp.category].count++;
      totals[exp.category].total += exp.totalCost;
    });
    return totals;
  };

  const categoryTotals = getCategoryTotals();
  const totalExpenditures = getTotalExpenditures();

  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Asset Expenditures</h2>
            <p className="text-gray-600 mt-1">Track and manage asset consumption and usage</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="w-4 h-4" />
              Budget Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              Record Expenditure
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
              <p className="text-sm text-gray-600">Total Records</p>
              <p className="text-xl font-bold text-gray-900">{expenditures.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-xl font-bold text-gray-900">${totalExpenditures.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Operations</p>
              <p className="text-xl font-bold text-gray-900">{operations.length - 1}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg per Record</p>
              <p className="text-xl font-bold text-gray-900">${Math.round(totalExpenditures / expenditures.length).toLocaleString()}</p>
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
                placeholder="Search by item, expenditure ID, or reason..."
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

          {/* Operation Filter */}
          <select
            value={selectedOperation}
            onChange={(e) => setSelectedOperation(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {operations.map(operation => (
              <option key={operation} value={operation}>{operation}</option>
            ))}
          </select>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Expenditures Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item & Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity & Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Operation & Purpose
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Personnel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Authorization
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenditures.map((expenditure) => (
                <tr key={expenditure.id} className="hover:bg-gray-50">
                  
                  {/* Item & Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <DollarSign className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{expenditure.item}</div>
                        <div className="text-sm text-blue-600">{expenditure.expenditureId}</div>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full mt-1 ${getCategoryColor(expenditure.category)}`}>
                          {expenditure.category}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">{expenditure.base}</div>
                      </div>
                    </div>
                  </td>

                  {/* Quantity & Cost */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">
                        {expenditure.quantityExpended.toLocaleString()} {expenditure.unit}
                      </div>
                      <div className="text-sm text-gray-600">
                        ${expenditure.unitCost.toFixed(2)} per {expenditure.unit.toLowerCase().slice(0, -1)}
                      </div>
                      <div className="font-semibold text-red-600">
                        ${expenditure.totalCost.toLocaleString()} total
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getRecoverableColor(expenditure.isRecoverable)}`}>
                        {expenditure.isRecoverable ? 'Recoverable' : 'Non-recoverable'}
                      </span>
                    </div>
                  </td>

                  {/* Operation & Purpose */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">
                        {expenditure.operationName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {expenditure.reason}
                      </div>
                      <div className="text-xs text-blue-600">
                        Budget: {expenditure.budgetCode}
                      </div>
                      <div className="text-xs text-gray-500">
                        Location: {expenditure.location}
                      </div>
                    </div>
                  </td>

                  {/* Date & Personnel */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-900">{expenditure.expenditureDate}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Used by: {expenditure.personnel}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <User className="w-3 h-3" />
                        Recorded: {expenditure.recordedBy}
                      </div>
                    </div>
                  </td>

                  {/* Authorization */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span className="text-sm font-medium text-gray-900">{expenditure.authorizedBy}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Approved: {expenditure.approvalDate}
                      </div>
                      <div className="text-xs text-gray-500">
                        Asset ID: {expenditure.assetId}
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded transition-colors" title="Download Report">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
              Showing {filteredExpenditures.length} of {expenditures.length} expenditures
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

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Expenditure by Category */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Expenditures by Category</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(categoryTotals).map(([category, data]) => (
                <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(category)}`}>
                      {category}
                    </span>
                    <span className="text-sm text-gray-600">{data.count} records</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${data.total.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">
                      {((data.total / totalExpenditures) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent High-Value Expenditures */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">High-Value Expenditures</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {expenditures
                .sort((a, b) => b.totalCost - a.totalCost)
                .slice(0, 5)
                .map((expenditure) => (
                  <div key={expenditure.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{expenditure.item}</p>
                      <p className="text-sm text-gray-600">{expenditure.operationName}</p>
                      <p className="text-xs text-gray-500">{expenditure.expenditureDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-600">${expenditure.totalCost.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{expenditure.base}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Budget Tracking */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Budget Overview</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4" />
              Current Month: March 2024
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">${totalExpenditures.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$50,000</div>
              <div className="text-sm text-gray-600">Monthly Budget</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                ${(50000 - totalExpenditures).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${totalExpenditures / 50000 > 0.8 ? 'text-red-600' : 'text-green-600'}`}>
                {((totalExpenditures / 50000) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Budget Used</div>
            </div>
          </div>
          
          {/* Budget Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Budget Utilization</span>
              <span className="text-sm font-medium text-gray-900">
                ${totalExpenditures.toLocaleString()} / $50,000
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  totalExpenditures / 50000 > 0.8 ? 'bg-red-600' : 
                  totalExpenditures / 50000 > 0.6 ? 'bg-yellow-600' : 'bg-green-600'
                }`}
                style={{ width: `${Math.min((totalExpenditures / 50000) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenditures;