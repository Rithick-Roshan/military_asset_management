import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Save, X, Search, Package, 
  MapPin, Calendar, FileText, AlertCircle,
  CheckCircle, User, Building, Hash,
  ArrowRight, Truck, Shield
} from 'lucide-react';

import axios from 'axios';

const AddTransfer = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    asset_id: '',
    from_base_id: '',
    to_base_id: '',
    transfer_value: '',
    transfer_date: '',
    transfer_status:''
  });

  const [errors, setErrors] = useState({});
  const [assets, setAssets] = useState([]);
  const [bases, setBases] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [assetSearchTerm, setAssetSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
    const takeAssetData = async () =>{
     try{
        const response = await axios.get("http://localhost:3000/asset/getall");
        if(response.status===200){
            setAssets(response.data)
            setFilteredAssets(response.data);
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
                setBases(response.data);
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

  useEffect(() => {
    // Initialize data
    takeBaseData();
    takeAssetData();
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, transfer_date: today }));
  }, []);

  useEffect(()=>{
      console.log(assets);
  },[assets])

  useEffect(() => {
    // Filter assets based on search term AND from base selection
    let filtered = assets;
    
    // First filter by from base if selected
    if (formData.from_base_id) {
      const selectedBase = bases.find(base => base.base_id === parseInt(formData.from_base_id));
      filtered = assets.filter(asset => 
        asset.base_name === selectedBase?.base_name && 
        asset.current_status === 'Available'
      );
    }
    
    // Then filter by search term
    filtered = filtered.filter(asset =>
      asset.asset_name.toLowerCase().includes(assetSearchTerm.toLowerCase()) ||
      asset.asset_serial_number.toLowerCase().includes(assetSearchTerm.toLowerCase()) ||
      asset.category.toLowerCase().includes(assetSearchTerm.toLowerCase())
    );
    
    setFilteredAssets(filtered);
  }, [assetSearchTerm, assets, formData.from_base_id, bases]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    setFormData(prev => ({ 
      ...prev, 
      asset_id: asset.asset_id
    }));
    setAssetSearchTerm(asset.asset_name);
    setShowAssetDropdown(false);
    
    // Clear asset-related errors
    if (errors.assetId) {
      setErrors(prev => ({ ...prev, assetId: '' }));
    }
  };

  const handleFromBaseChange = (e) => {
    const fromBaseId = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      from_base_id: fromBaseId,
      asset_id: '', // Clear asset selection when base changes
      transfer_value: '' // Clear quantity when base changes
    }));
    setSelectedAsset(null);
    setAssetSearchTerm('');
    
    // Clear related errors
    if (errors.fromBaseId) {
      setErrors(prev => ({ ...prev, fromBaseId: '', assetId: '', quantity: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.asset_id) newErrors.assetId = 'Please select an asset';
    if (!formData.from_base_id) newErrors.fromBaseId = 'Please select source base';
    if (!formData.to_base_id) newErrors.toBaseId = 'Please select destination base';
    if (formData.from_base_id === formData.to_base_id) {
      newErrors.toBaseId = 'Destination base must be different from source base';
    }
    if (!formData.transfer_value || formData.transfer_value <= 0) {
      newErrors.quantity = 'Please enter a valid quantity';
    }
    if (selectedAsset && parseInt(formData.transfer_value) > selectedAsset.available) {
      newErrors.quantity = `Quantity cannot exceed available amount (${selectedAsset.available})`;
    }
    if (!formData. transfer_date) newErrors.transfer_date = 'Please select transfer date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      console.log(formData);
      console.log('Transfer data to submit:',selectedAsset.available- formData.transfer_value);
      selectedAsset.available=selectedAsset.available- formData.transfer_value;
      if(selectedAsset.available<0){
          alert("please enter corrrect asset value");
          return;
      }
      
      if(formData.transfer_status==""){
           alert("please enter the correct transer status");
           return;

      }
      const responseAsset = await axios.put("http://localhost:3000/asset/updateassetforassignment",selectedAsset);
      if(responseAsset.status===200){
               console.log("new asset updated sucesfully");
      }
       

      const response = await axios.post("http://localhost:3000/transfer/create", formData);
      
      if(response.status===200){
            alert('Transfer request submitted successfully!');

            setCurrentPage("transfers");
      }
      
    } catch (error) {
      console.error('Error creating transfer:', error);
      alert('Failed to create transfer. Please try again.');
    }
  };

  const handleCancel = () => {
    if (setCurrentPage) {
      setCurrentPage('transfers');
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

  const getAvailableBasesForTransfer = () => {
    return bases.filter(base => base.base_id !== parseInt(formData.from_base_id));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.asset-dropdown')) {
        setShowAssetDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Transfer</h1>
            <p className="text-gray-600 mt-1">Transfer assets between military bases</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        
        {/* From Base Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
             Select Source Base
          </h3>
          
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Base *
            </label>
            <select
              name="fromBaseId"
              value={formData.from_base_id}
              onChange={handleFromBaseChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.fromBaseId ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select source base</option>
              {bases.map(base => (
                <option key={base.base_id} value={base.base_id}>
                  {base.base_name} ({base.base_code}) - {base.location}
                </option>
              ))}
            </select>
            {errors.fromBaseId && <p className="text-red-500 text-sm mt-1">{errors.fromBaseId}</p>}
          </div>
        </div>

        {/* Asset Selection - Only show if from base is selected */}
        {formData.from_base_id && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Select Asset & Quantity
            </h3>
          
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Asset Search & Selection */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Asset *
                  </label>
                  <div className="relative asset-dropdown">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={filteredAssets.length > 0 ? "Search for assets..." : "No assets available at selected base"}
                      value={assetSearchTerm}
                      onChange={(e) => {
                        setAssetSearchTerm(e.target.value);
                        setShowAssetDropdown(true);
                      }}
                      onFocus={() => setShowAssetDropdown(true)}
                      disabled={!formData.from_base_id || filteredAssets.length === 0}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.assetId ? 'border-red-300' : 'border-gray-300'
                      } ${(!formData.from_base_id || filteredAssets.length === 0) ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    />
                    
                    {/* Asset Dropdown */}
                    {showAssetDropdown && filteredAssets.length > 0 && formData.from_base_id && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {filteredAssets.map((asset) => (
                          <button
                            key={asset.asset_id}
                            type="button"
                            onClick={() => handleAssetSelect(asset)}
                            className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">{asset.asset_name}</div>
                                <div className="text-sm text-gray-500">{asset.asset_serial_number}</div>
                                <div className="text-xs text-gray-400">{asset.category}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-blue-600">Available: {asset.available}</div>
                                <div className={`text-xs ${getConditionColor(asset.condition_status)}`}>
                                  {asset.condition_status}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {!formData.from_base_id && (
                    <p className="text-gray-500 text-sm mt-1">Please select a source base first</p>
                  )}
                  {formData.from_base_id && filteredAssets.length === 0 && (
                    <p className="text-yellow-600 text-sm mt-1">No available assets at the selected base</p>
                  )}
                  {errors.assetId && <p className="text-red-500 text-sm mt-1">{errors.assetId}</p>}
                </div>

                {/* Quantity - Only show if asset is selected */}
                {selectedAsset && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      name="transfer_value"
                      min="1"
                      max={selectedAsset.available}
                      value={formData.transfer_value}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.quantity ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter quantity"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Available: {selectedAsset.available}
                    </p>
                    {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                  </div>
                )}
              </div>

              {/* Selected Asset Display */}
              {selectedAsset && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Selected Asset</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="text-sm font-medium">{selectedAsset.asset_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Serial:</span>
                      <span className="text-sm font-medium">{selectedAsset.asset_serial_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Category:</span>
                      <span className="text-sm font-medium">{selectedAsset.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Available:</span>
                      <span className="text-sm font-medium text-blue-600">{selectedAsset.available}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Condition:</span>
                      <span className={`text-sm font-medium ${getConditionColor(selectedAsset.condition_status)}`}>
                        {selectedAsset.condition_status}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* To Base Selection - Only show if asset and quantity are selected */}
        {selectedAsset && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Select Destination Base
            </h3>
            
            <div className="max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Base *
              </label>
              <select
                name="to_base_id"
                value={formData.to_base_id}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.toBaseId ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select destination base</option>
                {getAvailableBasesForTransfer().map(base => (
                  <option key={base.base_id} value={base.base_id}>
                    {base.base_name} ({base.base_code}) - {base.location}
                  </option>
                ))}
              </select>
              {errors.toBaseId && <p className="text-red-500 text-sm mt-1">{errors.toBaseId}</p>}
            </div>
          </div>
        )}
        {selectedAsset && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" />
                Select Transfer Status
            </h3>
            
            <div className="max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                status *
              </label>
              <select
                name="transfer_status"
                value={formData.transfer_status}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.transfer_status ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select Status</option>
                  <option  value="Completed">
                        Completed
                  </option>
                  <option  value="Pending">
                        Pending
                  </option>
                  <option  value="In_Transit">
                        In_Transit
                  </option>
                   <option  value="Failed">
                       Failed 
                  </option>
              </select>
              {errors.transfer_status && <p className="text-red-500 text-sm mt-1">{errors.transfer_status}</p>}
            </div>
          </div>
        )}

        {formData.from_base_id && selectedAsset && formData.transfer_value && formData.to_base_id && (
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Submit Transfer Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTransfer;