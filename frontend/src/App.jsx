import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import HomeDashboard from './components/pages/HomeDashboard'
import Assets from './components/pages/Assets'
import Purchases from './components/pages/Purchases'
import Assignments from './components/pages/Assignments'
import UsersPage from './components/pages/Users'
import AddUser from './components/pages/AddUser'
import AddBase from './components/pages/AddBase'
import EditBase from './components/pages/EditBase'
import EditUser from './components/pages/EditUser'
import NewPurchase from './components/pages/NewPerchase'
import AddAssignment from './components/pages/AddAssignment'
import Transfers from './components/pages/Transfers'
import AddTransfer from './components/pages/AddTransfer'
import AddAsset from './components/pages/AddAsset'

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [baseId, setBaseId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  const api="https://military-asset-management-backend-1qc6.onrender.com";

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token) {
      // Optionally verify token with backend here
      setLoggedIn(true);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  function handeleLoginSystem() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData)
      console.log("user data:"+parsed.username);
      setUser(parsed);
    }
    setLoggedIn(true);
    setCurrentPage("home");
  }

  // Logout function
  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    setUser(null);
    setCurrentPage("Login");
  }

  if (!isLoggedIn || setCurrentPage==="Login") {
    return <Login handeleLoginSystem={handeleLoginSystem} api={api} />
  }

  return (
    <>
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isSidebarOpen={isSidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        handleLogout={handleLogout}

      />
      <Header 
        currentPage={currentPage}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
        handleLogout={handleLogout}
      />
      {currentPage === "home" && <HomeDashboard setCurrentPage={setCurrentPage} user={user} api={api} />}
      {currentPage === "assets" && <Assets setCurrentPage={setCurrentPage} user={user} api={api} />}
      {currentPage === "purchases" && <Purchases setCurrentPage={setCurrentPage} user={user} api={api} />}
      {currentPage === "assignments" && <Assignments setCurrentPage={setCurrentPage} user={user} api={api} />}
      {currentPage === "users" && <UsersPage setCurrentPage={setCurrentPage} setBaseId={setBaseId} setUserId={setUserId} user={user} api={api} />}
      {currentPage === "addUser" && <AddUser setCurrentPage={setCurrentPage} user={user} api={api} />}
      {currentPage === "addBase" && <AddBase setCurrentPage={setCurrentPage} user={user} api={api} />}
      {currentPage === "editBase" && <EditBase setCurrentPage={setCurrentPage} baseId={baseId} user={user} api={api}/>}
      {currentPage === "editUser" && <EditUser setCurrentPage={setCurrentPage} userId={userId}  user={user} api={api}/>}
      {currentPage === "newPurchase" && <NewPurchase setCurrentPage={setCurrentPage} user={user} api={api}/>}
      {currentPage === "addAssignment" && <AddAssignment setCurrentPage={setCurrentPage} user={user} api={api}/>}
      {currentPage === "transfers" && <Transfers setCurrentPage={setCurrentPage} user={user} api={api}/>}
      {currentPage === "addTransfer" && <AddTransfer setCurrentPage={setCurrentPage} user={user} api={api} />}
      {currentPage==="addAsset" && <AddAsset setCurrentPage={setCurrentPage} user={user} api={api}/>}
    </>
  )
}

export default App;