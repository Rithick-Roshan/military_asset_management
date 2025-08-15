import { useState } from 'react';
import axios from 'axios';
const Login =()=>{
    const [user,setUser]=useState({
        email:'',
        password:''
    })
    const handleLogin = async (e)=>{
        e.preventDefault();
        try{
            if(user.email === '' || user.password === ''){
                alert('Please fill in all fields');
                return;
            }
            const response = await axios.post('http://localhost:3000/user/login',user);
            if(response.status === 200){
                alert('Login sucessfully');
            }
            else if(response.status == 400){
                alert('Invalid credentials');
            }
            console.log(response);
              
        }catch(err){
            if(err.status == 400){
                alert('Invalid credentials');
                return;
            }
            alert('Login failed, please try again');
            console.error(err);
        }

    }
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2"  o>Email</label>
                <input type="text" id="username" 
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                value={user.email}
                onChange={(e)=>setUser({...user,email:e.target.value})}
                />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2"  >Password</label>
                <input type="password"
                 id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={user.password}
                  onChange={(e)=>setUser({...user,password:e.target.value})}
                />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200" onClick={handleLogin}>Login</button>
            </form>
        </div>
        </div>
    );
}

export default Login;