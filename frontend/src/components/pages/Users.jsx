import {use, useEffect,useState} from 'react';
import { Users, Eye, Edit, Trash2, Plus, Filter,Shield } from 'lucide-react';
import axios from 'axios';

const UsersPage = ({setCurrentPage,setBaseId,setUserId,user,api}) => {
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
      const response = await axios.get(`${api}/user/getbases`);
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

  const handleUserEdit =(userId) =>{
     setUserId(userId);
     setCurrentPage('editUser');
  }

  const handleUserDelete = async (user_id) => {
    console.log('Delete user:', user_id);
    try{
        const response = await axios.delete(`${api}/user/deleteuser`,{data:{user_id}});
        if(response.status === 200){
            alert('User deleted successfully');
            takeUsersData(); 
        } else {
            alert('Failed to delete user');
        }
    }
    catch(err){
      alert("Error deleting user");
      console.log(err);
    }
  }

const handleAddBase = () => {
  console.log('Add new base');
  setCurrentPage('addBase');  
};

  const handleBaseEdit = (baseId) => {
    setCurrentPage('editBase');
    setBaseId(baseId);
  };

  const handleBaseDelete = async (base_id) => {
    console.log('Delete user:', base_id);
    try{
        const response = await axios.delete(`${api}/user/deletebase`,{data:{base_id}});
        if(response.status === 200){
            alert('Base deleted successfully');
            takeBaseData(); 
        } else {
            alert('Failed to delete base');
        }
    }
    catch(err){
      alert("Error deleting base");
      console.log(err);
    }
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
              {user?.role!=="Logistics_Officer" && (
              <button 
                onClick={handleAddUser}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add New User
              </button>
              )}
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
              
              {user?.role!=="Base_Commander" && (
              <tbody className="bg-white divide-y divide-gray-200">
                {usersDataArray.map((User) => (
                  <tr key={User.user_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {User.username.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{User.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(User.role)}`}>
                        {User.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {User.base_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {User.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(User.status)}`}>
                        {User.status?'Active':'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleUserEdit(User.user_id)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleUserDelete(User.user_id)}
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
              )}
              {user?.role==="Base_Commander" && (
              <tbody className="bg-white divide-y divide-gray-200">
                {usersDataArray.filter(data=>user.base_id===data.base_id).map((User) => (
                  <tr key={User.user_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {User.username.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{User.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(User.role)}`}>
                        {User.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {User.base_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {User.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(User.status)}`}>
                        {User.status?'Active':'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleUserEdit(User.user_id)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleUserDelete(User.user_id)}
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
              )}
            </table>
          </div>
        </div>
      </div>

       {/* Base Management Section */}
      {user?.role!=="Base_Commander" && ( 
      <div className="max-w-7xl mx-auto mt-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Base Management</h2>
            </div>
            <div className="flex items-center gap-3">
              {user?.role ==="Admin" && (
              <button 
                onClick={handleAddBase}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add New Base
              </button>
              )}
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

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default UsersPage;