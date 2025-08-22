import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { User, Save, X, Eye, EyeOff, Mail, MapPin, Shield, Phone } from 'lucide-react';

const AddUser = ({setCurrentPage,user,api }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    base_id: '',
    password_hash: '',
    status: 'Active'
  });
  const [confirmPassword,setConfirmPassword]=useState('');

   const [baseDataArray, setBaseDataArray] = useState([]);
   const takeBaseData = async () => {
    try {
      const response = await axios.get(`${api}/user/getbases`);
      setBaseDataArray(response.data); // update state
      console.log(response.data);
    } catch (err) {
      alert("Error fetching bases"+err);
      console.log(err.status, err.message);
    }
  };
  useEffect(() => {
    takeBaseData();
  }, []);

  useEffect(() => {
    console.log("Updated baseDataArray in add base:", baseDataArray);
  }, [baseDataArray]);


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

    const roleOptions = [
    { value: '', label: 'Select Role' },
    { value: 'Admin', label: 'Administrator' },
    { value: 'Base_Commander', label: 'Base Commander' },
    { value: 'Logistics_Officer', label: 'Logistics Officer' },
  ];

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

    // Required field validation
    if (!formData.username.trim()) newErrors.firstName = 'User name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.base_id) newErrors.base_id = 'Base is required';
    if (!formData.password_hash) newErrors.password_hash = 'Password is required';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm password';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      console.log('Invalid email format');
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (formData.password_hash && formData.password_hash.length < 8) {
      console.log('Password too short');
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password_hash && confirmPassword && formData.password_hash !== confirmPassword) {
      console.log('Passwords do not match');
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    for(const key in newErrors){
      console.log(key,newErrors[key]);
    }

  console.log('Validation errors:'+newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if ( validateForm()){
          try{
               const response = await axios.post(`${api}/user/register`,formData);
               if(response.status === 200){
                 alert("User created successfully");
                 setFormData(
                  {
                    username: '',
                    email: '',
                    role: '',
                    base_id: '',
                    password_hash: '',
                    status: 'Active'
                  }
                 )
               }
          }
          catch(err){
             if(err.status ===400){
                alert("Enter vaild data");
             }
             else if(err.status === 500){
                alert("Internal server error, please try again later");
             }
             else if(err.status === 409){
                alert("User already exists with this email or username");
              }
             else{
                alert("An unexpected error occurred: " + err.message);
             }
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
              <User className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Add New User</h2>
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
              {/* Personal Information Section */}
              <div className="md:col-span-2">
                <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Personal Information
                </h3>
              </div>

              {/* Ueser name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="user@military.gov"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Military Information Section */}
              <div className="md:col-span-2 mt-6">
                <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Military Information
                </h3>
              </div>

              {/* Role */}
              {user?.role==="Admin" && ( 
              <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.role ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {roleOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
              </div>
             

              {/* Base */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Assignment *
                </label>
                <div className="relative">
                  <select
                    name="base_id"
                    value={formData.base_id}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.base ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {baseDataArray.map(option => (
                      <option key={option.base_id} value={option.base_id}>{option.base_name}</option>
                    ))}
                  </select>
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
                {errors.base && <p className="text-red-500 text-sm mt-1">{errors.base}</p>}
              </div>
             </>
              )}
              {user?.role==="Base_Commander" && ( 
              <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.role ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {roleOptions.map(option =>option.value!=="Admin" && (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
              </div>
             

              {/* Base */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Assignment *
                </label>
                <div className="relative">
                  <select
                    name="base_id"
                    value={formData.base_id}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.base ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {baseDataArray.map(option => option.base_id===user.base_id && (
                      <option key={option.base_id} value={option.base_id}>{option.base_name}</option>
                    ))}
                  </select>
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
                {errors.base && <p className="text-red-500 text-sm mt-1">{errors.base}</p>}
              </div>
             </>
              )}

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Account Information Section */}
              <div className="md:col-span-2 mt-6">
                <h3 className="text-md font-medium text-gray-900 mb-4">
                  Account Security
                </h3>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password_hash"
                    value={formData.password_hash}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
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

export default AddUser;