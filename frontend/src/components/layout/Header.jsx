import React, { useState } from 'react';
import { 
  Menu, Bell, Search, Settings, LogOut, ChevronDown, 
  User, HelpCircle, Shield
} from 'lucide-react';

const Header = ({ currentPage, isSidebarOpen, setSidebarOpen }) => {
  const [userDropdown, setUserDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  
  const pageNames = {
    home: 'Dashboard',
    assets: 'Assets',
    transfers: 'Transfers', 
    purchases: 'Purchases',
    assignments: 'Assignments',
    expenditures: 'Expenditures',
    users: 'Users'
  };

  const notifications = [
    { id: 1, message: 'New transfer request from Fort Liberty', time: '5 min ago', unread: true },
    { id: 2, message: 'Purchase order PO-2024-001 delivered', time: '1 hour ago', unread: true },
    { id: 3, message: 'Asset assignment approved', time: '2 hours ago', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative z-30">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className=" p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          
          {/* Page Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-gray-800">
              {pageNames[currentPage] || 'Dashboard'}
            </h1>
            {currentPage !== 'home' && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                Active
              </span>
            )}
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-3">
          
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationDropdown(!notificationDropdown)}
              className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Notifications Dropdown */}
            {notificationDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Mark all read
                    </button>
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Help Button */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <HelpCircle className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdown(!userDropdown)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">JA</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-800">John Admin</p>
                <p className="text-xs text-gray-600">Administrator</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            
            {/* User Dropdown Menu */}
            {userDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                {/* Profile Section */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">JA</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">John Administrator</p>
                      <p className="text-sm text-gray-600">admin@military.gov</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Shield className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-green-600">Admin Access</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Menu Items */}
                <div className="py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Profile Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">System Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    <HelpCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Help & Support</span>
                  </button>
                </div>
                
                {/* Logout */}
                <div className="border-t border-gray-100 py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-red-50 transition-colors group">
                    <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
                    <span className="text-sm text-gray-700 group-hover:text-red-600">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for dropdowns */}
      {(userDropdown || notificationDropdown) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setUserDropdown(false);
            setNotificationDropdown(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;