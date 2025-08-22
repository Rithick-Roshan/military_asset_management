import React, { useState } from 'react';
import { User, Save, X, Eye, EyeOff, Mail, MapPin, Shield, Phone } from 'lucide-react';
import axios from 'axios';
const EditBase = ({setCurrentPage,baseId,api }) => {
  const [baseData, setBaseData] = useState({
    base_id: baseId,
    base_name: '',
    base_code: '',
    location: ''
  });
  const [errors, setErrors] = useState({});

  // Options for dropdowns

console.log("edit base id" +baseId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBaseData(prev => ({
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

    // Required field validation
    if (!baseData.base_name.trim()) newErrors.firstName = 'Base name is required';
    if (!baseData.base_code.trim()) newErrors.lastName = 'Base code  is required';
    if (!baseData.location.trim()) newErrors.email = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    
    if (validateForm()) {
      try{
       const response = await axios.put(`${api}/user/updatebase`,baseData);
       if(response.status==200){
          alert("Base was updated");
       }
        
        setBaseData({
        base_id: baseId,
        base_name: '',
        base_code: '',
        location: ''
      });

      setCurrentPage('users');

      }
      catch(err){
           if(err.status==400){
              alert("Enter correct form of base ");
              return ;
           }
           else if(err.status==500){
              alert("Server error Please try again");
              return
           }
           else if(err.status==409){
              alert("Base already exists");
              return;
           }
           alert("Failed to add base");
           console.log(err);
        }
    }
  };

  const handleCancel = () => {
    setCurrentPage('users');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Edit Base </h2>
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
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Name *
                </label>
                <input
                  type="text"
                  name="base_name"
                  value={baseData.base_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Chepauk"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base code *
                </label>
                <input
                  type="text"
                  name="base_code"
                  value={baseData.base_code}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="TN-6921"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={baseData.location}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="chennai"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
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
                Save User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBase;