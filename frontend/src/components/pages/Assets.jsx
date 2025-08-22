import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Eye, Edit, Trash2, 
  Package, MapPin, User, 
  CheckCircle,
  UserStar
} from 'lucide-react';

const Assets = ({setCurrentPage,user,api}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBase, setSelectedBase] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [assestArray, setAssestArray] = useState([]);
  const [baseAssetArray,setBaseAssetArray]=useState([])

  const takeAssest = async () =>{
    try{
        const response = await axios.get(`${api}/asset/getall`);
        if(response.status === 200){
          setAssestArray(response.data);

          console.log(response.data); 
        }  
    }
    catch(err){
      alert("failed to fetch assests"+err);
    }
  }

  useEffect(() =>{
      takeAssest();
  },[]);
 
  useEffect(()=>{
       console.log("assestArray updated", assestArray);
       setBaseAssetArray(assestArray.filter(a=> a.base_id===user.base_id));
  },[assestArray]);
  
  useEffect(()=>{
     console.log("base array",baseAssetArray);
  },[baseAssetArray])

  const categories = ['All','Others', 'Weapons', 'Vehicles', 'Ammunition', 'Electronics', 'Communications', 'Medical'];
  const current_statuses = ['All','Available', 'Assigned', 'Under Maintenance', 'Decommissioned'];

 const filteredAssets = assestArray.filter(asset => {
  const matchesSearch = asset.asset_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       asset.asset_serial_number?.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
  const matchesBase = selectedBase === 'All' || asset.base_name === selectedBase;
  const matchesStatus = selectedStatus === 'All' || asset.current_status === selectedStatus;
  
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


  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Asset Inventory</h2>
            <p className="text-gray-600 mt-1">Manage and track all military assets across bases</p>
          </div>
          {user?.role!='Admin' &&(
          <div className="flex items-center gap-3">
            <button 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setCurrentPage('addAsset')}
            >
              <Plus className="w-4 h-4" />
              Add Asset
            </button>
          </div>
          )}
        </div>
      </div>

      { user?.role==="Logistics_Officer" && (
      <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Assets</p>
              <p className="text-xl font-bold text-gray-900">{assestArray.length}</p>
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
                {assestArray.filter(a => a.current_status === 'Available').length}
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
                {assestArray.filter(a => a.current_status === 'Assigned').length}
              </p>
            </div>
          </div>
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
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assestArray.map((asset) => {
                return (
                  <tr key={asset.asset_id} className="hover:bg-gray-50">
                    
                    {/* Asset Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Package className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{asset.asset_name}</div>
                          <div className="text-sm text-gray-500">{asset.asset_serial_number}</div>
              
                        </div>
                      </div>
                    </td>

                    {/* Location & Status */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          {asset.base_name}
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(asset.current_status)}`}>
                          {asset.current_status}
                        </span>
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">{asset.total_quantity} total</div>
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
                      <div className={`font-medium ${getConditionColor(asset.condition_status)}`}>
                        {asset.condition_status}
                      </div>
                    </td>

                    {/* Value */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        ${asset.purchase_price}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${asset.purchase_price/asset.total_quantity}/unit
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
 
        </div>
      </div>
      </>)}
      { user?.role==="Admin" && (
      <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Assets</p>
              <p className="text-xl font-bold text-gray-900">{assestArray.length}</p>
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
                {assestArray.filter(a => a.current_status === 'Available').length}
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
                {assestArray.filter(a => a.current_status === 'Assigned').length}
              </p>
            </div>
          </div>
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
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assestArray.map((asset) => {
                return (
                  <tr key={asset.asset_id} className="hover:bg-gray-50">
                    
                    {/* Asset Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Package className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{asset.asset_name}</div>
                          <div className="text-sm text-gray-500">{asset.asset_serial_number}</div>
              
                        </div>
                      </div>
                    </td>

                    {/* Location & Status */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          {asset.base_name}
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(asset.current_status)}`}>
                          {asset.current_status}
                        </span>
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">{asset.total_quantity} total</div>
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
                      <div className={`font-medium ${getConditionColor(asset.condition_status)}`}>
                        {asset.condition_status}
                      </div>
                    </td>

                    {/* Value */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        ${asset.purchase_price}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${asset.purchase_price/asset.total_quantity}/unit
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

        </div>
      </div>
      </>)}
      { user?.role==="Base_Commander" && (
     
            <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Assets</p>
              <p className="text-xl font-bold text-gray-900">{baseAssetArray.length}</p>
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
                {baseAssetArray.filter(a => a.current_status === 'Available').length}
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
                {baseAssetArray.filter(a => a.current_status === 'Assigned').length}
              </p>
            </div>
          </div>
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
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {baseAssetArray.map((asset) => {
                return (
                  <tr key={asset.asset_id} className="hover:bg-gray-50">
                    
                    {/* Asset Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Package className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{asset.asset_name}</div>
                          <div className="text-sm text-gray-500">{asset.asset_serial_number}</div>
              
                        </div>
                      </div>
                    </td>

                    {/* Location & Status */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          {asset.base_name}
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(asset.current_status)}`}>
                          {asset.current_status}
                        </span>
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">{asset.total_quantity} total</div>
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
                      <div className={`font-medium ${getConditionColor(asset.condition_status)}`}>
                        {asset.condition_status}
                      </div>
                    </td>

                    {/* Value */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        ${asset.purchase_price}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${asset.purchase_price/asset.total_quantity}/unit
                      </div>
                    </td>


                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
      </div>
      </>
      )}
    </div>
  );
};

export default Assets;