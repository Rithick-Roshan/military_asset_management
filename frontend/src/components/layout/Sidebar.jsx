import { Shield, Home, Package, ArrowLeftRight, ShoppingCart, Users, DollarSign, User } from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage, isSidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'home', name: 'HomeDashboard', icon: Home },
    { id: 'assets', name: 'Assets', icon: Package },
    { id: 'transfers', name: 'Transfers', icon: ArrowLeftRight },
    { id: 'purchases', name: 'Purchases', icon: ShoppingCart },
    { id: 'assignments', name: 'Assignments', icon: Users },
    { id: 'expenditures', name: 'Expenditures', icon: DollarSign },
    { id: 'users', name: 'Users', icon: User }
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="flex items-center justify-center h-18 px-5 bg-gray-800 border-b border-gray-700">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div className="text-white  ml-2">
          <div className="font-bold text-lg">Military Asset Management</div>
          <div className="text-sm">Version 1.0</div>
        </div>
      </div>
       
      <nav className="mt-4"> 
           <div className='mb-4 px-4 '>
               <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                Main Menu
               </h3>
           </div>
           
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-6 py-3 text-left transition-all duration-200 group ${
                isActive 
                  ? 'bg-gray-800 border-r-4 border-blue-400 text-blue-400 bg-opacity-75' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 transition-colors ${
                isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'
              }`} />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>
        <div className="absolute bottom-0 left-0 w-full px-4 py-2 bg-gray-800 border-t border-gray-700">
            <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="w-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                title={isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
            >
                {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
            </button>
        </div>

    </div>
      
  );
};

export default Sidebar;
