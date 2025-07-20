import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Plus,
  QrCode,
  Package,
  TrendingUp,
  RefreshCw,
  Settings,
  Leaf,
  Factory,
  Warehouse,
  Truck,
  Store,
  Award,
  Globe,
  Clock,
  CheckCircle,
  PlayCircle,
  Zap,
  Sparkles,
  Eye
} from 'lucide-react';

const Dashboard = ({ userRole = 'Farmer' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 12,
    activeProducts: 8,
    completedProducts: 4
  });

  // Mock navigate function for demo
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  // Mock contract and account for demo
  const contract = {};
  const account = '0x123...abc';

  useEffect(() => {
    setMounted(true);
    if (contract && account) {
      loadDashboardData();
    } else {
      // Demo data
      setTimeout(() => {
        const demoProducts = [
          {
            id: '1',
            batchId: 'TEA-2024-001',
            productName: 'Earl Grey Premium',
            origin: 'Darjeeling, India',
            grade: 'FTGFOP1',
            quantity: '500',
            currentStage: 'Processing',
            timestamp: '2024-01-15'
          },
          {
            id: '2',
            batchId: 'TEA-2024-002',
            productName: 'Green Dragon Well',
            origin: 'Hangzhou, China',
            grade: 'Superior',
            quantity: '750',
            currentStage: 'Warehousing',
            timestamp: '2024-01-12'
          },
          {
            id: '3',
            batchId: 'TEA-2024-003',
            productName: 'Ceylon Orange Pekoe',
            origin: 'Nuwara Eliya, Sri Lanka',
            grade: 'BOP',
            quantity: '1000',
            currentStage: 'Sold',
            timestamp: '2024-01-10'
          }
        ];
        setProducts(demoProducts);
        setLoading(false);
      }, 1500);
    }
  }, [contract, account]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Original contract logic would go here
      // For now using demo data
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStageText = (stage) => {
    const stages = ['Cultivation', 'Processing', 'Warehousing', 'Distribution', 'Retail', 'Sold'];
    return stages[stage] || stage;
  };

  const getStageColor = (stage) => {
    const colors = {
      'Cultivation': 'from-green-400 to-emerald-500',
      'Processing': 'from-blue-400 to-cyan-500',
      'Warehousing': 'from-yellow-400 to-orange-500',
      'Distribution': 'from-purple-400 to-pink-500',
      'Retail': 'from-indigo-400 to-blue-500',
      'Sold': 'from-gray-400 to-gray-600'
    };
    return colors[stage] || 'from-green-400 to-emerald-500';
  };

  const getStageIcon = (stage) => {
    const icons = {
      'Cultivation': Leaf,
      'Processing': Factory,
      'Warehousing': Warehouse,
      'Distribution': Truck,
      'Retail': Store,
      'Sold': CheckCircle
    };
    return icons[stage] || Leaf;
  };

  const getRoleActions = () => {
    switch (userRole) {
      case 'Farmer':
        return [
          { label: 'Create New Product', icon: Plus, action: () => navigate('/create-product'), gradient: 'from-green-500 to-emerald-600' },
          { label: 'Track Products', icon: QrCode, action: () => navigate('/track'), gradient: 'from-teal-500 to-green-600' }
        ];
      case 'Processor':
      case 'Warehouse':
      case 'Distributor':
      case 'Retailer':
        return [
          { label: 'Update Product Stage', icon: RefreshCw, action: () => navigate('/update-product'), gradient: 'from-green-500 to-emerald-600' },
          { label: 'Track Products', icon: QrCode, action: () => navigate('/track'), gradient: 'from-teal-500 to-green-600' }
        ];
      case 'Authority':
        return [
          { label: 'Admin Panel', icon: Settings, action: () => navigate('/admin'), gradient: 'from-green-500 to-emerald-600' },
          { label: 'Track Products', icon: QrCode, action: () => navigate('/track'), gradient: 'from-teal-500 to-green-600' }
        ];
      default:
        return [];
    }
  };

  const getRoleIcon = () => {
    const icons = {
      'Farmer': Leaf,
      'Processor': Factory,
      'Warehouse': Warehouse,
      'Distributor': Truck,
      'Retailer': Store,
      'Authority': Award
    };
    return icons[userRole] || Leaf;
  };

  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-green-400/10 to-emerald-600/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-teal-400/10 to-green-500/10 rounded-full blur-lg animate-bounce" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-32 w-24 h-24 bg-gradient-to-br from-emerald-300/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center relative">
        <FloatingElements />
        <div className="text-center relative z-10">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-spin">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-2">
            Loading Dashboard...
          </h2>
          <p className="text-green-600">Fetching your tea supply chain data</p>
        </div>
      </div>
    );
  }

  const RoleIcon = getRoleIcon();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      <FloatingElements />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #10b981 2px, transparent 2px),
                           radial-gradient(circle at 80% 50%, #059669 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          animation: 'float 25s ease-in-out infinite'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className={`mb-12 text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
              <RoleIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                {userRole} Dashboard
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Globe className="w-4 h-4 text-green-500 animate-pulse" />
                <p className="text-green-600 font-medium">Tea Supply Chain Management</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { 
              title: 'Total Products', 
              value: stats.totalProducts, 
              icon: Package, 
              gradient: 'from-green-500 to-emerald-600',
              bgGradient: 'from-green-50 to-emerald-50',
              delay: '0s'
            },
            { 
              title: 'Active Products', 
              value: stats.activeProducts, 
              icon: PlayCircle, 
              gradient: 'from-emerald-500 to-teal-600',
              bgGradient: 'from-emerald-50 to-teal-50',
              delay: '0.2s'
            },
            { 
              title: 'Completed', 
              value: stats.completedProducts, 
              icon: CheckCircle, 
              gradient: 'from-teal-500 to-green-600',
              bgGradient: 'from-teal-50 to-green-50',
              delay: '0.4s'
            }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.title}
                className={`group cursor-pointer transition-all duration-700 hover:scale-105 ${
                  mounted ? 'animate-slide-up' : 'opacity-0 translate-y-10'
                }`}
                style={{animationDelay: stat.delay}}
              >
                <div className={`relative p-6 bg-gradient-to-br ${stat.bgGradient} rounded-3xl border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-green-700 mb-2">{stat.title}</p>
                      <p className={`text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
                      </p>
                    </div>
                    <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Sparkle Effect */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className={`mb-12 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{animationDelay: '0.6s'}}>
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-yellow-500 animate-pulse" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
              Quick Actions
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {getRoleActions().map((action, index) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className={`group relative px-6 py-4 bg-gradient-to-r ${action.gradient} text-white rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/25 active:scale-95 overflow-hidden`}
                >
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                  
                  <div className="relative flex items-center gap-3">
                    <IconComponent className="w-5 h-5 group-hover:animate-bounce" />
                    {action.label}
                    <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Table */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-green-100 overflow-hidden transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{animationDelay: '0.8s'}}>
          <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-green-600 animate-pulse" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                Your Products
              </h2>
            </div>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                <Package className="w-10 h-10 text-white" />
              </div>
              <p className="text-xl font-semibold text-gray-600 mb-2">No products found</p>
              <p className="text-green-600">
                {userRole === 'Farmer' ? 'Create your first product!' : 'Products will appear here when assigned to you.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-100 to-emerald-100">
                  <tr>
                    {['Batch ID', 'Product Name', 'Origin', 'Grade', 'Quantity (kg)', 'Current Stage', 'Created Date'].map((header, index) => (
                      <th key={header} className="px-6 py-4 text-left text-sm font-bold text-green-800">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-50">
                  {products.map((product, index) => {
                    const StageIcon = getStageIcon(product.currentStage);
                    return (
                      <tr
                        key={product.id}
                        className="group hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300"
                      >
                        <td className="px-6 py-4">
                          <div className="font-bold text-green-800 group-hover:text-green-900">
                            {product.batchId}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">{product.productName}</td>
                        <td className="px-6 py-4 text-gray-700">{product.origin}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-medium">
                            {product.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{product.quantity}</td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r ${getStageColor(product.currentStage)} text-white rounded-full text-sm font-medium shadow-lg`}>
                            <StageIcon className="w-4 h-4" />
                            {product.currentStage}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            {product.timestamp}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;