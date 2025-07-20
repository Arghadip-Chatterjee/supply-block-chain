import React, { useState, useEffect } from 'react';
import { Wallet, Leaf, Shield, Users, Truck, Store, Building2, Award, Sparkles, Globe, Lock, Zap } from 'lucide-react';

const Login = ({ setIsAuthenticated, setUserRole }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock Web3 functions for demo - replace with your actual Web3Context
  const connectWallet = async () => {
    // Simulate wallet connection
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
  };

  const roles = [
    { 
      value: 'Farmer', 
      label: 'Tea Farmer / Grower',
      icon: Leaf,
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      bgGradient: 'from-emerald-50 via-green-50 to-teal-50',
      description: 'Cultivate premium tea leaves'
    },
    { 
      value: 'Processor', 
      label: 'Processor / Factory',
      icon: Building2,
      gradient: 'from-green-500 via-emerald-600 to-cyan-700',
      bgGradient: 'from-green-50 via-emerald-50 to-cyan-50',
      description: 'Transform leaves into products'
    },
    { 
      value: 'Warehouse', 
      label: 'Warehouse',
      icon: Store,
      gradient: 'from-teal-400 via-green-500 to-emerald-600',
      bgGradient: 'from-teal-50 via-green-50 to-emerald-50',
      description: 'Store and manage inventory'
    },
    { 
      value: 'Distributor', 
      label: 'Distributor',
      icon: Truck,
      gradient: 'from-lime-500 via-green-600 to-emerald-700',
      bgGradient: 'from-lime-50 via-green-50 to-emerald-50',
      description: 'Transport across networks'
    },
    { 
      value: 'Retailer', 
      label: 'Retailer / Exporter',
      icon: Users,
      gradient: 'from-green-500 via-teal-600 to-cyan-700',
      bgGradient: 'from-green-50 via-teal-50 to-cyan-50',
      description: 'Connect with end consumers'
    },
    { 
      value: 'Authority', 
      label: 'Tea Board Authority',
      icon: Award,
      gradient: 'from-emerald-500 via-green-600 to-teal-700',
      bgGradient: 'from-emerald-50 via-green-50 to-teal-50',
      description: 'Ensure quality & compliance'
    }
  ];

  const handleLogin = async () => {
    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const walletResult = await connectWallet();
      if (!walletResult.success) {
        throw new Error(walletResult.error);
      }
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', selectedRole);
      setIsAuthenticated(true);
      setUserRole(selectedRole);
    } catch (err) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const FloatingOrbs = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-teal-400/20 to-green-500/20 rounded-full blur-lg animate-bounce" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-emerald-300/15 to-cyan-500/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-lime-400/20 to-green-600/20 rounded-full blur-xl animate-bounce" style={{animationDelay: '0.5s'}}></div>
    </div>
  );

  const selectedRoleData = roles.find(role => role.value === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 relative overflow-hidden">
      <FloatingOrbs />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #059669 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-lg transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Animated Header */}
          <div className="text-center mb-10">
            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl mb-6 shadow-2xl transition-all duration-1000 hover:scale-110 hover:rotate-3 ${mounted ? 'animate-bounce' : ''}`}>
              <Leaf className="w-10 h-10 text-white" />
              <Sparkles className="w-4 h-4 text-green-200 absolute -top-1 -right-1 animate-pulse" />
            </div>
            
            <h1 className="text-5xl font-black bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent mb-3 leading-tight">
              Tea Supply Chain
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-green-300 animate-spin" style={{animationDuration: '3s'}} />
              <p className="text-green-100 text-lg font-medium">Blockchain-Based Traceability System</p>
              <Lock className="w-5 h-5 text-green-300 animate-pulse" />
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto animate-pulse"></div>
          </div>

          {/* Main Glass Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
            
            {/* Card Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-green-500/5 rounded-3xl"></div>
            
            {error && (
              <div className="relative mb-6 p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-400/30 rounded-2xl animate-shake">
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-red-300 mr-3 animate-pulse" />
                  <p className="text-red-100 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Role Selection */}
            <div className="relative mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                <label className="text-xl font-bold text-white">
                  Select Your Role
                </label>
              </div>
              
              <div className="grid gap-4">
                {roles.map((role, index) => {
                  const IconComponent = role.icon;
                  const isSelected = selectedRole === role.value;
                  
                  return (
                    <div
                      key={role.value}
                      onClick={() => setSelectedRole(role.value)}
                      className={`relative cursor-pointer group transition-all duration-500 transform hover:scale-105 ${
                        mounted ? 'animate-slide-in' : 'opacity-0 translate-x-10'
                      }`}
                      style={{animationDelay: `${index * 100}ms`}}
                    >
                      <div className={`relative p-5 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                        isSelected
                          ? 'border-green-400/60 shadow-lg shadow-green-400/25 scale-105'
                          : 'border-white/20 hover:border-green-400/40 hover:shadow-lg hover:shadow-green-400/10'
                      }`}>
                        
                        {/* Dynamic Background */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${
                          isSelected ? role.bgGradient : 'from-white/5 to-transparent'
                        } opacity-80 transition-all duration-300`}></div>
                        
                        {/* Selection Glow Effect */}
                        {isSelected && (
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-emerald-500/10 to-teal-500/10 animate-pulse"></div>
                        )}
                        
                        <div className="relative flex items-center">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-4 transition-all duration-300 ${
                            isSelected 
                              ? `bg-gradient-to-br ${role.gradient} shadow-lg animate-pulse` 
                              : 'bg-white/10 group-hover:bg-white/20'
                          }`}>
                            <IconComponent className={`w-7 h-7 transition-all duration-300 ${
                              isSelected ? 'text-white scale-110' : 'text-green-200 group-hover:text-white'
                            }`} />
                          </div>
                          
                          <div className="flex-1">
                            <p className={`font-bold text-lg transition-all duration-300 ${
                              isSelected ? 'text-white' : 'text-green-100 group-hover:text-white'
                            }`}>
                              {role.label}
                            </p>
                            <p className={`text-sm transition-all duration-300 ${
                              isSelected ? 'text-green-100' : 'text-green-300 group-hover:text-green-200'
                            }`}>
                              {role.description}
                            </p>
                          </div>
                          
                          {isSelected && (
                            <div className="ml-4 animate-bounce">
                              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Connect Button */}
            <button
              onClick={handleLogin}
              disabled={loading || !selectedRole}
              className={`relative w-full py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden group ${
                loading || !selectedRole
                  ? 'bg-gray-600/50 cursor-not-allowed text-gray-300'
                  : 'bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white hover:shadow-2xl hover:shadow-green-500/50 active:scale-95'
              }`}
            >
              {/* Button Glow Effect */}
              {!loading && selectedRole && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              )}
              
              {/* Animated Shine */}
              {!loading && selectedRole && (
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              )}
              
              <div className="relative flex items-center justify-center">
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    <span className="animate-pulse">Connecting to Blockchain...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                    Connect Wallet & Login
                    <Sparkles className="w-5 h-5 ml-3 group-hover:animate-pulse" />
                  </>
                )}
              </div>
            </button>

            {/* Enhanced Security Note */}
            <div className="mt-6 p-5 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-2xl border border-green-400/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-emerald-500/5 animate-pulse"></div>
              <div className="relative flex items-start">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 animate-pulse">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-green-200 mb-2 flex items-center gap-2">
                    🔒 Security Note
                    <Lock className="w-4 h-4 animate-bounce" />
                  </p>
                  <p className="text-green-100 leading-relaxed">
                    Make sure you have <span className="font-semibold text-white">MetaMask</span> installed and connected to the correct network.
                    This demo allows role selection for <span className="font-semibold text-emerald-200">testing purposes</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Animation */}
          <div className="text-center mt-8 animate-fade-in" style={{animationDelay: '1s'}}>
            <div className="flex items-center justify-center gap-2 text-green-200 mb-2">
              <Globe className="w-5 h-5 animate-spin" style={{animationDuration: '4s'}} />
              <span className="text-lg font-medium">Powered by Blockchain Technology</span>
              <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>
            <p className="text-green-300 font-light">
              Transparent • Secure • Traceable Supply Chain
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Login;