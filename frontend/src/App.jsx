import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import  Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import HomeDashboard from './components/pages/HomeDashboard'
import Assets from './components/pages/Assets'
import Purchases from './components/pages/Purchases'
import Expenditures from './components/pages/Expenditures'
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

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn,setLoggedIn]=useState(false);
  const [baseId,setBaseId] = useState(null);
  const [userId,setUserId] = useState(null);

   function handeleLoginSystem(){
    setLoggedIn(true);
    setCurrentPage("home");
   }

  if(!isLoggedIn){
    return <Login handeleLoginSystem={handeleLoginSystem} />
  }
  return (
    <>
       <Sidebar
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isSidebarOpen={isSidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
         />
         <Header 
            currentPage={currentPage}
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          {currentPage === "home" && <HomeDashboard />}
          {currentPage === "assets" && <Assets />}
          {currentPage === "purchases" && <Purchases setCurrentPage={setCurrentPage} />}
          {currentPage ==="expenditures" && <Expenditures />}
          {currentPage ==="assignments" && <Assignments setCurrentPage={setCurrentPage}  />}
          {currentPage ==="users" && <UsersPage  setCurrentPage={setCurrentPage} setBaseId={setBaseId} setUserId={setUserId} />}
          {currentPage === "addUser" && <AddUser setCurrentPage={setCurrentPage} />}
          {currentPage === "addBase" && <AddBase setCurrentPage={setCurrentPage} />}
          {currentPage === "editBase" && <EditBase setCurrentPage={setCurrentPage} baseId={baseId}/>}
          {currentPage === "editUser" && <EditUser setCurrentPage={setCurrentPage} userId={userId} />}
          {currentPage === "newPurchase" && <NewPurchase setCurrentPage={setCurrentPage} />}
          {currentPage === "addAssignment" && <AddAssignment setCurrentPage={setCurrentPage} />}
          {currentPage === "transfers" && <Transfers setCurrentPage={setCurrentPage} />}
          {currentPage === "addTransfer" && <AddTransfer setCurrentPage={setCurrentPage} />}
          
    </>
  )
}

export default App
