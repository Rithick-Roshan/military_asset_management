import { useState } from 'react';
import axios from 'axios';

const Login = ({ handeleLoginSystem}) => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            if (user.email === '' || user.password === '') {
                alert('Please fill in all fields');
                return;
            }

            setLoading(true);
            
            const response = await axios.post('http://localhost:3000/user/login', user);
            
            if (response.status === 200 && response.data.success) {
                console.log(response.data.user.user_id);
                // Store JWT token in localStorage
                localStorage.setItem('token', response.data.token);
                
                // Optionally store user data
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                alert('Login successful');
                handeleLoginSystem();
            }
        } catch (err) {
            console.error('Login error:', err);
            
            if (err.response && err.response.status === 400) {
                alert(err.response.data.message || 'Invalid credentials');
            } else if (err.response && err.response.status === 500) {
                alert('Server error. Please try again later.');
            } else {
                alert('Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input 
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            disabled={loading}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;