import React, { useState, useEffect } from 'react';
import { Save, X, Package, Users, MapPin, FileText, AlertCircle } from 'lucide-react';
import axios from 'axios';

const AddAssignment = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    base_id: '',
    asset_id: '',
    mission: '',
    user_id: '',
    assignment_value: '',
    status: 'Pending'
  });

  const [availableAssets, setAvailableAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [assetData,setAssetData] = useState([]);
  const [baseData,setBaseData] = useState([]);
  const [userData,setUserData] = useState([]);

   
  const takeAssetData = async () =>{
     try{
        const response = await axios.get("http://localhost:3000/asset/getall");
        if(response.status===200){
            setAssetData(response.data);
            console.log("asset recevied data sucessfully ", response.data);
        }
     }
     catch(err){
        if(err.status==404){
            console.log("file not found"+err);
        }
        else if(err.status==500){
             console.log("internal server error"+err);
        } 
        else console.log("error to fetch the asset data"+err);
     }
  }

  const takeBaseData = async ()=>{
       try{
            const response = await axios.get("http://localhost:3000/user/getbases");
            if(response.status===200){
                setBaseData(response.data);
                console.log("base data fetched"+response.data);
            }
       }
       catch(err){
        if(err.status==404){
            console.log("file not found"+err);
        }
        else if(err.status==500){
             console.log("internal server error"+err);
        } 
        else console.log("error to fetch the base data"+err);
       }
  }

  const takeUserdata = async()=>{
     try{
         const response = await axios.get("http://localhost:3000/user/getusers");
         if(response.status===200){
            setUserData(response.data);
             console.log("User fetched sucessfully"+response.data);
         }
     }
     catch(err){
        if(err.status==404){
            console.log("file not found"+err);
        }
        else if(err.status==500){
             console.log("internal server error"+err);
        } 
        else console.log("error to fetch the base data"+err);
     }
  }
  useEffect(()=>{
      takeAssetData();
      takeBaseData();
      takeUserdata();
  },[]);
  
  useEffect(()=>{
     console.log("Asset Data "+assetData);
  },[assetData]);

  useEffect(()=>{
      console.log("Base data"+baseData);
  },[baseData]);

  useEffect(()=>{
    console.log("User data "+userData);
  },[userData])



  useEffect(() => {
    if (formData.base_id) {
      setLoading(true);
      setTimeout(() => {
        const filteredAssets = assetData.filter(
          asset => asset.base_id === parseInt(formData.base_id) && asset.current_status === 'Available'
        );
        setAvailableAssets(filteredAssets);
        setLoading(false);
      }, 300);
      
      setFormData(prev => ({ ...prev, asset_id: '' }));
    } else {
      setAvailableAssets([]);
    }
  }, [formData.base_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.base_id) newErrors.base_id = 'Base selection is required';
    if (!formData.asset_id) newErrors.asset_id = 'Asset selection is required';
    if (!formData.mission.trim()) newErrors.mission = 'Mission description is required';
    if (!formData.user_id) newErrors.user_id = 'User selection is required';
    if (!formData.assignment_value || formData.assignment_value <= 0) {
      newErrors.assignment_value = 'Assignment value must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
          console.log("selected asset "+selectedAsset.asset_id);
          const newAssetData=assetData.filter((data)=> data.asset_id===selectedAsset.asset_id)[0];
          console.log(newAssetData.available+" "+formData.assignment_value);
          newAssetData.available=newAssetData.available-formData.assignment_value;
          newAssetData.assigned=formData.assignment_value
          newAssetData.current_status=newAssetData.available>0?'Available':'Assigned';
          console.log(newAssetData.available);
          if(newAssetData.available<0){
              alert("Please give value of assigned  must less than available");
              return ;
            }
            newAssetData.status=newAssetData.available >(newAssetData.total_quantity/2) ?"Sufficient":"In-sufficient";
            console.log("new asset data "+newAssetData.available);
            const responseAsset = await axios.put("http://localhost:3000/asset/updateassetforassignment",newAssetData);
            if(responseAsset.status===200){
               console.log("new asset updated sucesfully");
            }

            const response = await axios.post("http://localhost:3000/assignment/create", formData);
            if (response.status === 200) {
                alert("Assignment created successfully");
            }
        setFormData({
          base_id: '',
          asset_id: '',
          mission: '',
          user_id: '',
          assignment_value: '',
          status: 'Pending'
        });

      } catch (err) {
        if (err.status === 400) {
          alert("Please check the form data");
          return;
        } else if (err.status === 500) {
          alert("Server error. Please try again");
          return;
        } else if (err.status === 409) {
          alert("Assignment already exists");
          return;
        }
        alert("Failed to create assignment");
        console.log(err);
      }
    }
  };

  const handleCancel = () => {
    setCurrentPage('assignments');
  };

  const selectedAsset = availableAssets.find(asset => asset.asset_id === parseInt(formData.asset_id));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Add New Assignment</h2>
            </div>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Base Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Base *
                </label>
                <div className="relative">
                  <select
                    name="base_id"
                    value={formData.base_id}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.base_id ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Choose a base...</option>
                    {baseData.map(base => (
                      <option key={base.base_id} value={base.base_id}>
                        {base.base_name} - {base.location}
                      </option>
                    ))}
                  </select>
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
                {errors.base_id && <p className="text-red-500 text-sm mt-1">{errors.base_id}</p>}
              </div>

              {/* Asset Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Asset *
                </label>
                <div className="relative">
                  <select
                    name="asset_id"
                    value={formData.asset_id}
                    onChange={handleInputChange}
                    disabled={!formData.base_id || loading}
                    className={`w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      errors.asset_id ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">
                      {!formData.base_id 
                        ? 'Select a base first...' 
                        : loading 
                          ? 'Loading assets...' 
                          : availableAssets.length === 0 
                            ? 'No available assets' 
                            : 'Choose an asset...'}
                    </option>
                    {availableAssets.map(asset => (
                      <option key={asset.asset_id} value={asset.asset_id}>
                        {asset.asset_name} ({asset.asset_serial_number}) - Available: {asset.available}
                      </option>
                    ))}
                  </select> 
                  <Package className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
                {errors.asset_id && <p className="text-red-500 text-sm mt-1">{errors.asset_id}</p>}
              </div>

              {/* User Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign To User *
                </label>
                <div className="relative">
                  <select
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.user_id ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Choose a user...</option>
                    {userData.map(user => (
                      <option key={user.user_id} value={user.user_id}>
                        {user.rank} {user.username} (ID: {user.user_id})
                      </option>
                    ))}
                  </select>
                  <Users className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
                {errors.user_id && <p className="text-red-500 text-sm mt-1">{errors.user_id}</p>}
              </div>

              {/* Assignment Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assignment Value *
                </label>
                <input
                  type="number"
                  name="assignment_value"
                  value={formData.assignment_value}
                  onChange={handleInputChange}
                  min="1"
                  max={selectedAsset?.available || 999}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.assignment_value ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter quantity"
                />
                {errors.assignment_value && <p className="text-red-500 text-sm mt-1">{errors.assignment_value}</p>}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assignment Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Compeleted">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>

            {/* Asset Details Display */}
            {selectedAsset && (
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-medium text-blue-900">Selected Asset Details</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-blue-700">Name:</span>
                    <p className="text-blue-900">{selectedAsset.asset_name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">Serial:</span>
                    <p className="text-blue-900">{selectedAsset.asset_serial_number}</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">Category:</span>
                    <p className="text-blue-900">{selectedAsset.category}</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">Available:</span>
                    <p className="text-blue-900">{selectedAsset.available} units</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mission Description */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mission Description *
              </label>
              <div className="relative">
                <textarea
                  name="mission"
                  value={formData.mission}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                    errors.mission ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe the mission and purpose of this assignment..."
                />
                <FileText className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
              {errors.mission && <p className="text-red-500 text-sm mt-1">{errors.mission}</p>}
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Create Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAssignment;