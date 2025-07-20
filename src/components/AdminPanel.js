import React, { useState, useEffect } from 'react';
import { Leaf, Users, Package, TrendingUp, Plus, Eye, CheckCircle, Clock, Truck } from 'lucide-react';

const AdminPanel = () => {
  // Mock Web3 context for demonstration
  const contract = { productCounter: () => Promise.resolve(0), products: () => Promise.resolve({ exists: false }) };
  const account = '0x1234567890abcdef';
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 156,
    activeProducts: 89,
    completedProducts: 67
  });

  const [newParticipant, setNewParticipant] = useState({
    address: '',
    role: '',
    name: '',
    location: ''
  });

  const roles = [
    { value: 1, label: 'Farmer' },
    { value: 2, label: 'Processor' },
    { value: 3, label: 'Warehouse' },
    { value: 4, label: 'Distributor' },
    { value: 5, label: 'Retailer' }
  ];

  const stages = ['Cultivation', 'Processing', 'Warehousing', 'Distribution', 'Retail', 'Sold'];

  // Mock data for demonstration
  useEffect(() => {
    const mockProducts = [
      { id: 1, batchId: 'TEA001', productName: 'Earl Grey Premium', origin: 'Darjeeling', currentStage: 2, currentOwner: '0x1234...5678', timestamp: '2024-01-15' },
      { id: 2, batchId: 'TEA002', productName: 'Green Tea Organic', origin: 'Assam', currentStage: 4, currentOwner: '0x9876...4321', timestamp: '2024-01-14' },
      { id: 3, batchId: 'TEA003', productName: 'Chamomile Blend', origin: 'West Bengal', currentStage: 1, currentOwner: '0xabcd...efgh', timestamp: '2024-01-13' }
    ];
    setAllProducts(mockProducts);
  }, []);

  const handleRegisterParticipant = async () => {
    if (!newParticipant.address || !newParticipant.role || !newParticipant.name || !newParticipant.location) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    // Mock registration
    setTimeout(() => {
      setSuccess('Participant registered successfully!');
      setOpenDialog(false);
      setNewParticipant({ address: '', role: '', name: '', location: '' });
      setLoading(false);
    }, 2000);
  };

  const loadAdminData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess('Data refreshed successfully!');
    }, 1000);
  };

  const getStageIcon = (stage) => {
    const icons = [<Leaf className="w-4 h-4" />, <Package className="w-4 h-4" />, <Package className="w-4 h-4" />, <Truck className="w-4 h-4" />, <Users className="w-4 h-4" />, <CheckCircle className="w-4 h-4" />];
    return icons[stage] || <Clock className="w-4 h-4" />;
  };

  const getStageColor = (stage) => {
    const colors = ['bg-emerald-100 text-emerald-800', 'bg-teal-100 text-teal-800', 'bg-yellow-100 text-yellow-800', 'bg-blue-100 text-blue-800', 'bg-purple-100 text-purple-800', 'bg-green-100 text-green-800'];
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };

  if (loading && allProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-green-800 animate-pulse">Loading Admin Panel...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-300 rounded-full opacity-20 animate-bounce" style={{animationDuration: '6s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-teal-200 rounded-full opacity-10 animate-ping" style={{animationDuration: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header with Tea Leaf Animation */}
        <div className="text-center mb-8 relative">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="w-12 h-12 text-green-600 animate-bounce mr-4" />
            <h1 className="text-5xl font-black bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Tea Board Authority
            </h1>
            <Leaf className="w-12 h-12 text-green-600 animate-bounce ml-4" style={{animationDelay: '0.5s'}} />
          </div>
          <p className="text-xl text-green-700 font-semibold animate-fade-in">Administrative Control Panel</p>
          <div className="h-1 w-32 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg animate-shake">
            <div className="flex items-center">
              <span className="font-semibold">Error:</span>
              <span className="ml-2">{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg animate-slide-down">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="font-semibold">{success}</span>
            </div>
          </div>
        )}

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="group">
            <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:rotate-1 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-semibold uppercase tracking-wide">Total Products</p>
                  <p className="text-4xl font-black text-white mt-2 animate-count-up">{stats.totalProducts}</p>
                </div>
                <Package className="w-12 h-12 text-green-200 group-hover:animate-bounce" />
              </div>
              <div className="mt-4 h-2 bg-green-300 rounded-full">
                <div className="h-full bg-white rounded-full w-4/5 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-6 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:rotate-1 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-semibold uppercase tracking-wide">Active Products</p>
                  <p className="text-4xl font-black text-white mt-2 animate-count-up">{stats.activeProducts}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-emerald-200 group-hover:animate-bounce" />
              </div>
              <div className="mt-4 h-2 bg-emerald-300 rounded-full">
                <div className="h-full bg-white rounded-full w-3/5 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="bg-gradient-to-br from-teal-400 to-teal-600 p-6 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:rotate-1 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm font-semibold uppercase tracking-wide">Completed</p>
                  <p className="text-4xl font-black text-white mt-2 animate-count-up">{stats.completedProducts}</p>
                </div>
                <CheckCircle className="w-12 h-12 text-teal-200 group-hover:animate-bounce" />
              </div>
              <div className="mt-4 h-2 bg-teal-300 rounded-full">
                <div className="h-full bg-white rounded-full w-2/5 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setOpenDialog(true)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-green-500/25 focus:outline-none focus:ring-4 focus:ring-green-300 flex items-center space-x-3"
          >
            <Plus className="w-5 h-5" />
            <span>Register Participant</span>
          </button>
          <button
            onClick={loadAdminData}
            disabled={loading}
            className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-8 py-4 rounded-xl font-bold shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-teal-500/25 focus:outline-none focus:ring-4 focus:ring-teal-300 flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Eye className="w-5 h-5" />
            <span>{loading ? 'Refreshing...' : 'Refresh Data'}</span>
          </button>
        </div>

        {/* Enhanced Products Table */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-green-100">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
            <h3 className="text-2xl font-black text-white flex items-center">
              <Package className="w-8 h-8 mr-3" />
              Supply Chain Products
            </h3>
            <p className="text-green-100 mt-1">Complete overview of all products in the system</p>
          </div>
          
          <div className="p-6">
            {allProducts.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-green-300 mx-auto mb-4 animate-bounce" />
                <p className="text-xl text-green-600 font-semibold">No products found in the system</p>
                <p className="text-green-500 mt-2">Start by adding your first product to the supply chain</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-green-100">
                      <th className="text-left py-4 px-4 font-bold text-green-800 uppercase tracking-wide">ID</th>
                      <th className="text-left py-4 px-4 font-bold text-green-800 uppercase tracking-wide">Batch ID</th>
                      <th className="text-left py-4 px-4 font-bold text-green-800 uppercase tracking-wide">Product Name</th>
                      <th className="text-left py-4 px-4 font-bold text-green-800 uppercase tracking-wide">Origin</th>
                      <th className="text-left py-4 px-4 font-bold text-green-800 uppercase tracking-wide">Stage</th>
                      <th className="text-left py-4 px-4 font-bold text-green-800 uppercase tracking-wide">Owner</th>
                      <th className="text-left py-4 px-4 font-bold text-green-800 uppercase tracking-wide">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts.map((product, index) => (
                      <tr key={product.id} className="border-b border-green-50 hover:bg-green-50/50 transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
                        <td className="py-4 px-4">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold text-sm">
                            #{product.id}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-black text-green-900 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-lg">
                            {product.batchId}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-semibold text-gray-800">{product.productName}</td>
                        <td className="py-4 px-4 text-green-700 font-medium">{product.origin}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getStageColor(product.currentStage)}`}>
                            {getStageIcon(product.currentStage)}
                            <span className="ml-2">{stages[product.currentStage]}</span>
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-lg">
                            {product.currentOwner.slice(0, 6)}...{product.currentOwner.slice(-4)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{product.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Dialog */}
        {openDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-scale-up">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-t-2xl">
                <h3 className="text-2xl font-black text-white flex items-center">
                  <Users className="w-8 h-8 mr-3" />
                  Register New Participant
                </h3>
                <p className="text-green-100 mt-1">Add a new member to the supply chain</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Wallet Address
                  </label>
                  <input
                    type="text"
                    value={newParticipant.address}
                    onChange={(e) => setNewParticipant(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full p-3 border-2 border-green-100 rounded-xl focus:border-green-500 focus:outline-none font-mono text-sm"
                    placeholder="0x..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Role
                  </label>
                  <select
                    value={newParticipant.role}
                    onChange={(e) => setNewParticipant(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full p-3 border-2 border-green-100 rounded-xl focus:border-green-500 focus:outline-none font-semibold"
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Name/Company
                  </label>
                  <input
                    type="text"
                    value={newParticipant.name}
                    onChange={(e) => setNewParticipant(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border-2 border-green-100 rounded-xl focus:border-green-500 focus:outline-none font-semibold"
                    placeholder="Enter participant name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newParticipant.location}
                    onChange={(e) => setNewParticipant(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-3 border-2 border-green-100 rounded-xl focus:border-green-500 focus:outline-none font-semibold"
                    placeholder="Enter location"
                  />
                </div>
              </div>

              <div className="flex gap-4 p-6 pt-0">
                <button
                  onClick={() => setOpenDialog(false)}
                  className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegisterParticipant}
                  disabled={loading}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Registering...
                    </span>
                  ) : (
                    'Register'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes slide-down {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes count-up {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes scale-up {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-slide-down { animation: slide-down 0.5s ease-out; }
        .animate-count-up { animation: count-up 0.8s ease-out; }
        .animate-scale-up { animation: scale-up 0.3s ease-out; }
        .animate-fade-in { animation: fade-in 1s ease-out; }
      `}</style>
    </div>
  );
};

export default AdminPanel;