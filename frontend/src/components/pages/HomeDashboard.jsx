import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Package, ArrowLeftRight, Users, DollarSign, 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  Clock, MapPin, Calendar, Activity, Shield, Truck,
  Radio, Zap, Heart, Plus,
  IndianRupee
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const HomeDashboard = ({setCurrentPage,user}) => {
  const [assetData, setAssetData] = useState([]);
  const [transferData, setTransferData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    totalAssets: 0,
    availableAssets: 0,
    assignedAssets: 0,
    activeTransfers: 0,
    totalPurchases: 0
  });
  const [categoryChartData, setCategoryChartData] = useState([]);
  const [statusChartData, setStatusChartData] = useState([]);
  const [monthlyPurchaseData, setMonthlyPurchaseData] = useState([]);

  // Fetch all data
  useEffect(() => {
    fetchAllData();
  }, []);

  // Calculate stats when data changes
  useEffect(() => {
    calculateStats();
    prepareCategoryChart();
    prepareStatusChart();
  }, [assetData, transferData, purchaseData, user]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        takeAssets(),
        takeTransferData(),
        takePurchaseData()
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const takeAssets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/asset/getall");
      if (response.status === 200) {
        console.log("Assets fetched successfully", response.data);
        setAssetData(response.data);
      }
    } catch (err) {
      console.log("Failed to fetch assets", err);
    }
  };

  const takeTransferData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/transfer/getall");
      if (response.status === 200) {
        setTransferData(response.data);
        console.log("Transfer data fetched successfully", response.data);
      }
    } catch (err) {
      console.log("Failed to fetch transfer data", err);
    }
  };

  const takePurchaseData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/purchase/getall");
      if (response.status === 200) {
        console.log("Purchase data fetched successfully", response.data);
        setPurchaseData(response.data);
      }
    } catch (err) {
      console.log("Failed to fetch purchase data", err);
    }
  };

  // Filter data based on user role and base
  const getFilteredData = () => {
    if (user?.role === "Base_Commander" && user?.base_id) {
      const filteredAssets = assetData.filter(asset => asset.base_id === user.base_id);
      const filteredTransfers = transferData.filter(transfer => 
        transfer.from_base_id === user.base_id || transfer.to_base_id === user.base_id
      );
      const filteredPurchases = purchaseData.filter(purchase => 
        purchase.base_id === user.base_id
      );
      
      return {
        assets: filteredAssets,
        transfers: filteredTransfers,
        purchases: filteredPurchases
      };
    }
    
    // For other roles, return all data
    return {
      assets: assetData,
      transfers: transferData,
      purchases: purchaseData
    };
  };

  const calculateStats = () => {
    const filteredData = getFilteredData();
    const { assets, transfers, purchases } = filteredData;

    if (assets.length === 0) return;

    const totalAssets = assets.reduce((sum, asset) => sum + (asset.total_quantity || 0), 0);
    const availableAssets = assets.reduce((sum, asset) => sum + (asset.available || 0), 0);
    const assignedAssets = assets.reduce((sum, asset) => sum + (asset.assigned || 0), 0);
    const activeTransfers = transfers.filter(t => 
      t.transfer_status === 'Pending' || t.transfer_status === 'In_Transit'
    ).length;
    
    const totalPurchases = purchases.reduce((sum, a) => sum + Number(a.total_amount), 0);

    setDashboardStats({
      totalAssets,
      availableAssets,
      assignedAssets,
      activeTransfers,
      totalPurchases
    });
  };

  const prepareCategoryChart = () => {
    const filteredData = getFilteredData();
    const { assets } = filteredData;

    if (assets.length === 0) return;

    const categoryStats = {};
    assets.forEach(asset => {
      const category = asset.category || 'Others';
      if (!categoryStats[category]) {
        categoryStats[category] = {
          name: category,
          quantity: 0,
          value: 0,
          assets: 0
        };
      }
      categoryStats[category].quantity += asset.total_quantity || 0;
      categoryStats[category].value += asset.purchase_price || 0;
      categoryStats[category].assets += 1;
    });

    const colors = {
      'Weapons': '#ef4444',
      'Vehicles': '#f97316', 
      'Ammunition': '#eab308',
      'Electronics': '#22c55e',
      'Medical': '#06b6d4',
      'Communications': '#8b5cf6',
      'Others': '#6b7280'
    };

    const chartData = Object.values(categoryStats).map(stat => ({
      ...stat,
      color: colors[stat.name] || '#6b7280'
    }));

    setCategoryChartData(chartData);
  };

  const prepareStatusChart = () => {
    const filteredData = getFilteredData();
    const { assets } = filteredData;

    if (assets.length === 0) return;

    const statusStats = {};
    assets.forEach(asset => {
      const status = asset.current_status || 'Unknown';
      if (!statusStats[status]) {
        statusStats[status] = { name: status, count: 0, quantity: 0 };
      }
      statusStats[status].count += 1;
      statusStats[status].quantity += asset.total_quantity || 0;
    });

    const colors = {
      'Available': '#22c55e',
      'Assigned': '#3b82f6',
      'In_Transit': '#f59e0b',
      'Under_Maintenance': '#ef4444',
      'Expended': '#dc2626',
      'Decommissioned': '#6b7280'
    };

    const chartData = Object.values(statusStats).map(stat => ({
      ...stat,
      value: stat.quantity,
      color: colors[stat.name] || '#6b7280'
    }));

    setStatusChartData(chartData);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Weapons': return <Shield className="w-5 h-5" />;
      case 'Vehicles': return <Truck className="w-5 h-5" />;
      case 'Electronics': return <Zap className="w-5 h-5" />;
      case 'Communications': return <Radio className="w-5 h-5" />;
      case 'Medical': return <Heart className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In_Transit': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatCompactNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Get filtered data for recent transfers
  const filteredData = getFilteredData();
  const recentTransfers = filteredData.transfers
    .sort((a, b) => new Date(b.transfer_date) - new Date(a.transfer_date))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Asset Management Dashboard
              {user?.role === "Base_Commander" && (
                <span className="text-sm font-normal text-blue-100 block">
                  Base ID: {user.base_id} - {user.username}
                </span>
              )}
            </h1>
            <p className="text-blue-100">
              Real-time overview of your military assets and operations.
              {user?.role === "Base_Commander" && " (Base-specific view)"}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{categoryChartData.length}</div>
              <div className="text-xs text-blue-100">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{filteredData.assets.length}</div>
              <div className="text-xs text-blue-100">Asset Types</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Assets</p>
            <p className="text-3xl font-bold text-gray-900">{formatCompactNumber(dashboardStats.totalAssets)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Available Assets</p>
            <p className="text-3xl font-bold text-gray-900">{formatCompactNumber(dashboardStats.availableAssets)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
              <ArrowLeftRight className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Active Transfers</p>
            <p className="text-3xl font-bold text-gray-900">{dashboardStats.activeTransfers}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
              <IndianRupee className="w-6 h-6" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Purchase</p>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(dashboardStats.totalPurchases)}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Categories Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Categories (by Quantity)</h3>
          {categoryChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, quantity }) => `${name}: ${quantity}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="quantity"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Quantity']} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-72 text-gray-500">
              No asset data available
            </div>
          )}
        </div>

        {/* Asset Status Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Status Distribution</h3>
          {statusChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-72 text-gray-500">
              No status data available
            </div>
          )}
        </div>
      </div>

      {/* Recent Transfers and Category Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transfers */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transfers</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800" onClick={()=>setCurrentPage('transfers')}>View All</button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTransfers.length > 0 ? (
                recentTransfers.map((transfer) => (
                  <div key={transfer.transfer_id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-gray-900">{transfer.asset_name || 'Asset'}</h4>
                          <span className="text-sm text-gray-500">× {transfer.transfer_value}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {transfer.from_base_name || 'Unknown'} → {transfer.to_base_name || 'Unknown'}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(transfer.transfer_date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(transfer.transfer_status)}`}>
                        {transfer.transfer_status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No recent transfers found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Category Summary</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {categoryChartData.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: category.color + '20' }}>
                      <div style={{ color: category.color }}>
                        {getCategoryIcon(category.name)}
                      </div>
                    </div>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{category.quantity.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{category.assets} assets</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;