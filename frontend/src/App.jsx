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

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn,setLoggedIn]=useState(false);

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
          {currentPage === "purchases" && <Purchases />}
          {currentPage ==="expenditures" && <Expenditures />}
          {currentPage ==="assignments" && <Assignments />}
          {currentPage ==="users" && <UsersPage  setCurrentPage={setCurrentPage}/>}
          {currentPage === "addUser" && <AddUser setCurrentPage={setCurrentPage} />}
          {currentPage === "addBase" && <AddBase setCurrentPage={setCurrentPage} />}
    </>
  )
}

export default App
