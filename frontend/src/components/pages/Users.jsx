import {use, useEffect,useState} from 'react';
import { Users, Eye, Edit, Trash2, Plus, Filter,Shield } from 'lucide-react';
import axios from 'axios';

// Sample users data
const usersData = [
  { id: 1, name: 'John Administrator', role: 'Admin', base: 'All Bases', email: 'admin@military.gov', status: 'Active' },
  { id: 2, name: 'Sarah Johnson', role: 'Base Commander', base: 'Fort Liberty', email: 'commander1@military.gov', status: 'Active' },
  { id: 3, name: 'Emily Davis', role: 'Logistics Officer', base: 'Fort Liberty', email: 'logistics1@military.gov', status: 'Active' },
  { id: 4, name: 'Michael Chen', role: 'Supply Sergeant', base: 'Camp Pendleton', email: 'supply1@military.gov', status: 'Active' },
  { id: 5, name: 'Robert Wilson', role: 'Logistics Officer', base: 'JBLM', email: 'logistics2@military.gov', status: 'Inactive' },
  { id: 6, name: 'Jennifer Martinez', role: 'Inventory Specialist', base: 'Fort Liberty', email: 'inventory1@military.gov', status: 'Active' },
  { id: 7, name: 'David Thompson', role: 'Base Commander', base: 'Camp Pendleton', email: 'commander2@military.gov', status: 'Active' }
];

const UsersPage = ({setCurrentPage}) => {
 const [baseDataArray, setBaseDataArray] = useState([]);
 const [usersDataArray, setUsersDataArray] = useState([]); 
 const takeUsersData = async () =>{
    try {
      const response = await axios.get("http://localhost:3000/user/getusers");
      setUsersDataArray(response.data); // update state
      console.log(response.data);
    } catch (err) {
      alert("Error fetching users");
      console.log(err);
    }
  }

  useEffect(() => {
    takeUsersData();
  }, []);

  useEffect(() => {
    console.log("Updated usersDataArray:", usersDataArray);
  }, [usersDataArray]);

  const takeBaseData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/getbases");
      setBaseDataArray(response.data); // update state
      console.log(response.data);
    } catch (err) {
      alert("Error fetching bases");
      console.log(err);
    }
  };
  useEffect(() => {
    takeBaseData();
  }, []);

  useEffect(() => {
    console.log("Updated baseDataArray:", baseDataArray);
  }, [baseDataArray]);


  const handleAddUser = () => {
    console.log('Add new user');
    setCurrentPage('addUser'); 
    
  };
const handleAddBase = () => {
  console.log('Add new base');
  setCurrentPage('addBase');  
};
  const handleView = (userId) => {
    console.log('View user:', userId);
    // Add view logic here
  };

  const handleEdit = (userId) => {
    console.log('Edit user:', userId);
    // Add edit logic here
  };

  const handleDelete = (userId) => {
    console.log('Delete user:', userId);
    // Add delete logic here
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800';
      case 'Base Commander':
        return 'bg-blue-100 text-blue-800';
      case 'Logistics Officer':
        return 'bg-orange-100 text-orange-800';
      case 'Supply Sergeant':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inventory Specialist':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button 
                onClick={handleAddUser}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add New User
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Base
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usersDataArray.map((user) => (
                  <tr key={user.user_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {user.username.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.base_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                        {user.status?'Active':'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleView(user.id)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(user.id)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Base Management</h2>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleAddBase}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add New Base
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Base_Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Base_Code
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {baseDataArray.map((base) => (
                  <tr key={base.base_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {base.base_name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{base.base_name}</div>
                        </div>
                      </div>
                    </td>
                   
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {base.base_code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {base.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleView(user.id)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(user.id)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;