import React, { useEffect, useState } from 'react';
import { 
  Plus, Search, Filter, Eye, Edit, RotateCcw, 
  Users, Calendar, MapPin, Package, 
  CheckCircle, Clock, AlertTriangle, User,
  Download, Upload, Badge, Shield
} from 'lucide-react';
import axios from 'axios';

const Assignments = ({setCurrentPage,user,api}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedBase, setSelectedBase] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [assignmentData,setAssignmentData]= useState([]);

  const takeAssignmentData = async()=>{
       try{
            const response = await axios.get(`${api}/assignment/getall`);
            if(response.status===200){
                setAssignmentData(response.data);
                console.log("Assignment fetched sucessfully"+response.data);
            }
       }
       catch(err){
            console.log("failed to fetch assignment"+err);
       }
  }

  useEffect(()=>{
      takeAssignmentData();
  },[])

  useEffect(()=>{
    console.log(assignmentData);
  },[assignmentData])
  const assignments = [
    {
      id: 1,
      assignmentId: 'ASN-2024-001',
      asset: 'M4A1 Carbine',
      serialNumber: 'M4-2024-001',
      category: 'Weapons',
      assignedTo: 'Sgt. John Smith',
      rank: 'Sergeant',
      unit: 'Alpha Company, 1st Battalion',
      base: 'Fort Liberty',
      assignmentDate: '2024-03-10',
      expectedReturnDate: '2024-06-10',
      actualReturnDate: null,
      status: 'Active',
      assignedBy: 'Lt. Col. Johnson',
      purpose: 'Combat Training Exercise',
      condition: 'Excellent',
      conditionAtAssignment: 'Excellent',
      serializedItem: true,
      personnelId: 'PER-001',
      responsibilityStatement: 'Signed',
      notes: 'Standard assignment for training exercise'
    },
    {
      id: 2,
      assignmentId: 'ASN-2024-002',
      asset: 'Night Vision Goggles',
      serialNumber: 'NVG-2024-015',
      category: 'Electronics',
      assignedTo: 'Cpl. Maria Rodriguez',
      rank: 'Corporal',
      unit: 'Bravo Platoon, 2nd Company',
      base: 'Camp Pendleton',
      assignmentDate: '2024-03-08',
      expectedReturnDate: '2024-03-25',
      actualReturnDate: '2024-03-24',
      status: 'Returned',
      assignedBy: 'Capt. Wilson',
      purpose: 'Night Operations Training',
      condition: 'Good',
      conditionAtAssignment: 'Excellent',
      serializedItem: true,
      personnelId: 'PER-002',
      responsibilityStatement: 'Signed',
      notes: 'Returned in good condition after night training'
    },
    {
      id: 3,
      assignmentId: 'ASN-2024-003',
      asset: 'Radio Set',
      serialNumber: 'RD-2024-008',
      category: 'Communications',
      assignedTo: 'Staff Sgt. Michael Davis',
      rank: 'Staff Sergeant',
      unit: 'Communications Squadron',
      base: 'JBLM',
      assignmentDate: '2024-02-15',
      expectedReturnDate: '2024-05-15',
      actualReturnDate: null,
      status: 'Active',
      assignedBy: 'Maj. Taylor',
      purpose: 'Field Communication Setup',
      condition: 'Good',
      conditionAtAssignment: 'Good',
      serializedItem: true,
      personnelId: 'PER-003',
      responsibilityStatement: 'Signed',
      notes: 'Long-term assignment for communication operations'
    },
    {
      id: 4,
      assignmentId: 'ASN-2024-004',
      asset: 'Medical Kit',
      serialNumber: 'MED-2024-025',
      category: 'Medical',
      assignedTo: 'Spc. Sarah Thompson',
      rank: 'Specialist',
      unit: 'Medical Corps, Field Hospital',
      base: 'Fort Hood',
      assignmentDate: '2024-03-12',
      expectedReturnDate: '2024-03-20',
      actualReturnDate: null,
      status: 'Overdue',
      assignedBy: 'Capt. Anderson',
      purpose: 'Medical Training Exercise',
      condition: 'Excellent',
      conditionAtAssignment: 'Excellent',
      serializedItem: false,
      personnelId: 'PER-004',
      responsibilityStatement: 'Signed',
      notes: 'Assignment overdue - follow up required'
    },
    {
      id: 5,
      assignmentId: 'ASN-2024-005',
      asset: 'Humvee',
      serialNumber: 'HV-2024-003',
      category: 'Vehicles',
      assignedTo: 'Lt. Robert Wilson',
      rank: 'Lieutenant',
      unit: 'Transportation Company',
      base: 'Fort Liberty',
      assignmentDate: '2024-03-01',
      expectedReturnDate: '2024-04-01',
      actualReturnDate: null,
      status: 'Active',
      assignedBy: 'Col. Brown',
      purpose: 'Vehicle Operations Training',
      condition: 'Good',
      conditionAtAssignment: 'Good',
      serializedItem: true,
      personnelId: 'PER-005',
      responsibilityStatement: 'Signed',
      notes: 'Vehicle assigned for extended training period'
    },
    {
      id: 6,
      assignmentId: 'ASN-2024-006',
      asset: '5.56mm Ammunition',
      serialNumber: 'AM-BATCH-001',
      category: 'Ammunition',
      assignedTo: 'Sgt. First Class James Miller',
      rank: 'Sergeant First Class',
      unit: 'Range Control, Training Division',
      base: 'Camp Pendleton',
      assignmentDate: '2024-03-14',
      expectedReturnDate: null,
      actualReturnDate: null,
      status: 'Expended',
      assignedBy: 'Maj. Davis',
      purpose: 'Marksmanship Training',
      condition: 'N/A',
      conditionAtAssignment: 'New',
      serializedItem: false,
      personnelId: 'PER-006',
      responsibilityStatement: 'Signed',
      notes: 'Ammunition fully expended during training exercise'
    }
  ];

  const categories = ['All', 'Weapons', 'Vehicles', 'Ammunition', 'Electronics', 'Communications', 'Medical'];
  const bases = ['All', 'Fort Liberty', 'Camp Pendleton', 'JBLM', 'Fort Hood'];
  const statuses = ['All', 'Active', 'Returned', 'Overdue', 'Expended', 'Lost', 'Damaged'];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.asset.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.assignmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || assignment.status === selectedStatus;
    const matchesBase = selectedBase === 'All' || assignment.base === selectedBase;
    const matchesCategory = selectedCategory === 'All' || assignment.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesBase && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Returned': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Expended': return 'bg-gray-100 text-gray-800';
      case 'Lost': return 'bg-red-100 text-red-800';
      case 'Damaged': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Fair': return 'text-yellow-600';
      case 'Poor': return 'text-red-600';
      case 'N/A': return 'text-gray-400';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Failed': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const isOverdue = (assignment) => {
    if (!assignment.expectedReturnDate || assignment.actualReturnDate) return false;
    const expectedDate = new Date(assignment.expectedReturnDate);
    const today = new Date();
    return today > expectedDate;
  };

  const getDaysOverdue = (assignment) => {
    if (!isOverdue(assignment)) return 0;
    const expectedDate = new Date(assignment.expectedReturnDate);
    const today = new Date();
    return Math.ceil((today - expectedDate) / (1000 * 60 * 60 * 24));
  };

  const getStatusCounts = () => {
    return {
      active: assignments.filter(a => a.status === 'Active').length,
      returned: assignments.filter(a => a.status === 'Returned').length,
      overdue: assignments.filter(a => a.status === 'Overdue').length,
      expended: assignments.filter(a => a.status === 'Expended').length
    };
  };

  const handleAddAssigment = ()=>{
       setCurrentPage("addAssignment");
  }

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Asset Assignments</h2>
            <p className="text-gray-600 mt-1">Track asset assignments to personnel and units</p>
          </div>
          {user?.role !=="Admin" && (
          <div className="flex items-center gap-3">
            <button 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleAddAssigment}
            >
              <Plus className="w-4 h-4" />
              New Assignment
            </button>
          </div>
          )}
        </div>
      </div>
      
      {/* Summary Cards */}
      {user?.role!=="Base_Commander" && (
      <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-gray-900">{assignmentData.filter( data => data.assignment_status==="Pending").length}</p>
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
              <p className="text-xl font-bold text-gray-900">{assignmentData.filter( data => data.assignment_status==="Compeleted").length}</p>
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
              <p className="text-xl font-bold text-gray-900">{assignmentData.filter( data => data.assignment_status==="Failed").length}</p>
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
                placeholder="Search by asset, assignment ID, or personnel name..."
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
        </div>
      </div>

      {/* Assignments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Personnel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Base
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status 
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mission
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignmentData.map((assignment) => (
                <tr key={assignment.assignment_id} className="hover:bg-gray-50">
                  
                  {/* Asset Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Package className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{assignment.asset_name}</div>
                        <div className="text-xs text-gray-500">{assignment.asset_serial_number}</div>
                        <div className="text-xs text-gray-400">{assignment.category}</div>
                      </div>
                    </div>
                  </td>

                  {/* Assigned Personnel */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Shield className="w-3 h-3 text-blue-500" />
                        <span className="font-medium text-gray-900">{assignment.username}</span>
                      </div>
                      <div className="text-sm text-gray-600">{assignment.role}</div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{assignment.base_name}</span>
                        <span className="text-gray-600">{assignment.location}</span>
                      </div>
                    </div>
                  </td>

                  {/* Status & Condition */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(assignment.assignment_status)}`}>
                          {getStatusIcon(assignment.assignment_status)}
                          {assignment.assignment_status}
                        </span>
                      </div>
                    </div>
                  </td>


                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-900 font-medium">
                        {assignment.Mission}
                      </div>
                    </div>
                  </td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
        

        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        </div>
      </div>
      </>
      )}


      {user?.role==="Base_Commander" && (
      <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-gray-900">{assignmentData.filter(data => user.base_id === data.base_id).filter( data => data.assignment_status==="Pending").length}</p>
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
              <p className="text-xl font-bold text-gray-900">{assignmentData.filter(data => user.base_id === data.base_id).filter( data => data.assignment_status==="Completed").length}</p>
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
              <p className="text-xl font-bold text-gray-900">{assignmentData.filter(data => user.base_id === data.base_id).filter( data => data.assignment_status==="Failed").length}</p>
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
                placeholder="Search by asset, assignment ID, or personnel name..."
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
        </div>
      </div>

      {/* Assignments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Personnel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Base
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status 
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mission
                </th>

              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignmentData.filter(data => user.base_id === data.base_id).map((assignment) => (
                <tr key={assignment.assignment_id} className="hover:bg-gray-50">
                  
                  {/* Asset Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Package className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{assignment.asset_name}</div>
                        <div className="text-xs text-gray-500">{assignment.asset_serial_number}</div>
                        <div className="text-xs text-gray-400">{assignment.category}</div>
                      </div>
                    </div>
                  </td>

                  {/* Assigned Personnel */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Shield className="w-3 h-3 text-blue-500" />
                        <span className="font-medium text-gray-900">{assignment.username}</span>
                      </div>
                      <div className="text-sm text-gray-600">{assignment.role}</div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{assignment.base_name}</span>
                        <span className="text-gray-600">{assignment.location}</span>
                      </div>
                    </div>
                  </td>

                  {/* Status & Condition */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(assignment.assignment_status)}`}>
                          {getStatusIcon(assignment.assignment_status)}
                          {assignment.assignment_status}
                        </span>
                      </div>
                    </div>
                  </td>


                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-900 font-medium">
                        {assignment.Mission}
                      </div>
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

export default Assignments;

