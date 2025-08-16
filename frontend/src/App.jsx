import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import  Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import HomeDashboard from './components/pages/HomeDashboard'
import Assets from './components/pages/Assets'
import Purchases from './components/pages/Purchases'

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

    </>
  )
}

export default App
