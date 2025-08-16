
import { 
  Package, ArrowLeftRight, Users, DollarSign, 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  Clock, MapPin, Calendar, Activity
} from 'lucide-react';

const HomeDashboard = () => {
  
  const stats = [
    {
      title: 'Total Assets',
      value: '5,175',
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Active Transfers',
      value: '23',
      change: '+8%',
      trend: 'up',
      icon: ArrowLeftRight,
      color: 'orange'
    },
    {
      title: 'Assignments',
      value: '156',
      change: '-3%',
      trend: 'down',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Monthly Budget',
      value: '$2.4M',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple'
    }
  ];

  const recentTransfers = [
    {
      id: 1,
      item: 'M4A1 Carbine',
      from: 'Fort Liberty',
      to: 'Camp Pendleton',
      quantity: 20,
      status: 'In Transit',
      date: '2024-03-15',
      urgency: 'medium'
    },
    {
      id: 2,
      item: 'Night Vision Goggles',
      from: 'Camp Pendleton',
      to: 'JBLM',
      quantity: 15,
      status: 'Pending Approval',
      date: '2024-03-14',
      urgency: 'high'
    },
    {
      id: 3,
      item: '5.56mm Ammunition',
      from: 'JBLM',
      to: 'Fort Hood',
      quantity: 1000,
      status: 'Completed',
      date: '2024-03-13',
      urgency: 'low'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'assignment',
      description: 'M4A1 Carbine assigned to Sgt. Johnson',
      time: '2 hours ago',
      icon: Users
    },
    {
      id: 2,
      type: 'purchase',
      description: 'New purchase order for 50 radios approved',
      time: '4 hours ago',
      icon: Package
    },
    {
      id: 3,
      type: 'transfer',
      description: 'Transfer from Fort Liberty completed',
      time: '6 hours ago',
      icon: ArrowLeftRight
    },
    {
      id: 4,
      type: 'expenditure',
      description: '500 rounds expended in training exercise',
      time: '1 day ago',
      icon: DollarSign
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Low stock alert: 9mm Ammunition below minimum threshold',
      base: 'Fort Liberty'
    },
    {
      id: 2,
      type: 'info',
      message: 'Transfer approval required for high-value items',
      base: 'Camp Pendleton'
    },
    {
      id: 3,
      type: 'success',
      message: 'Monthly inventory reconciliation completed',
      base: 'All Bases'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Activity className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
            <p className="text-blue-100">Here's what's happening with your assets today.</p>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">4</div>
              <div className="text-xs text-blue-100">Bases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-blue-100">Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'text-blue-600 bg-blue-100',
            orange: 'text-orange-600 bg-orange-100',
            green: 'text-green-600 bg-green-100',
            purple: 'text-purple-600 bg-purple-100'
          };
          
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Transfers */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transfers</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTransfers.map((transfer) => (
                <div key={transfer.id} className={`p-4 border-l-4 bg-gray-50 rounded-r-lg ${getUrgencyColor(transfer.urgency)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-gray-900">{transfer.item}</h4>
                        <span className="text-sm text-gray-500">× {transfer.quantity}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {transfer.from} → {transfer.to}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {transfer.date}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(transfer.status)}`}>
                      {transfer.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 mb-1">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.base}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-blue-300">
          <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900">Add Asset</p>
        </button>
        <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-orange-300">
          <ArrowLeftRight className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900">New Transfer</p>
        </button>
        <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-green-300">
          <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900">Assign Asset</p>
        </button>
        <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-purple-300">
          <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900">Record Expense</p>
        </button>
      </div>
    </div>
  );
};

export default HomeDashboard;