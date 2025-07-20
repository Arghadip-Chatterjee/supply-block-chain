import React, { useState } from 'react';
import { Search, Leaf, MapPin, Clock, User, Package, Award, CheckCircle, Circle } from 'lucide-react';

const ProductTracker = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [product, setProduct] = useState(null);
  const [productHistory, setProductHistory] = useState([]);
  const [batchId, setBatchId] = useState('');

  const stages = ['Cultivation', 'Processing', 'Warehousing', 'Distribution', 'Retail', 'Sold'];

  const getStageColor = (stage) => {
    const colors = {
      'Cultivation': 'from-green-400 to-emerald-600',
      'Processing': 'from-blue-400 to-cyan-600',
      'Warehousing': 'from-yellow-400 to-orange-500',
      'Distribution': 'from-purple-400 to-indigo-600',
      'Retail': 'from-pink-400 to-rose-600',
      'Sold': 'from-gray-400 to-gray-600'
    };
    return colors[stage] || 'from-gray-400 to-gray-600';
  };

  const getStageIcon = (stage) => {
    const icons = {
      'Cultivation': <Leaf className="w-5 h-5" />,
      'Processing': <Package className="w-5 h-5" />,
      'Warehousing': <MapPin className="w-5 h-5" />,
      'Distribution': <MapPin className="w-5 h-5" />,
      'Retail': <MapPin className="w-5 h-5" />,
      'Sold': <CheckCircle className="w-5 h-5" />
    };
    return icons[stage] || <Circle className="w-5 h-5" />;
  };

  // Mock function to simulate contract interaction
  const mockTrackProduct = async () => {
    if (!batchId.trim()) {
      setError('Please enter a batch ID');
      return;
    }

    setLoading(true);
    setError('');
    setProduct(null);
    setProductHistory([]);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // Mock product data
      const productInfo = {
        id: '12345',
        batchId: batchId,
        productName: 'Premium Earl Grey Tea',
        origin: 'Darjeeling, India',
        grade: 'Grade A+',
        quantity: '500',
        currentStage: 3,
        currentOwner: '0x742d35Cc6634C0532925a3b8D404d5d4b15FcD64',
        timestamp: new Date()
      };

      // Mock history data
      const historyData = [
        {
          stage: 0,
          stageName: 'Cultivation',
          handler: '0x742d35Cc6634C0532925a3b8D404d5d4b15FcD64',
          location: 'Tea Garden, Darjeeling',
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          notes: 'Organic cultivation with premium tea leaves'
        },
        {
          stage: 1,
          stageName: 'Processing',
          handler: '0x853f46Dd7745E0542936e4b8E303e5e4c25FdE65',
          location: 'Processing Facility, West Bengal',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          notes: 'Traditional processing methods applied'
        },
        {
          stage: 2,
          stageName: 'Warehousing',
          handler: '0x964g57Ee8856F1653047f5c9F414f6f5d36GgF76',
          location: 'Central Warehouse, Kolkata',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          notes: 'Quality checked and stored in optimal conditions'
        },
        {
          stage: 3,
          stageName: 'Distribution',
          handler: '0xa75h68Ff9967G2764158g6d0G525g7g6e47HhG87',
          location: 'Distribution Center, Mumbai',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          notes: 'Ready for retail distribution'
        }
      ];

      setProduct(productInfo);
      setProductHistory(historyData);

    } catch (err) {
      console.error('Error tracking product:', err);
      setError('Product not found or error occurred');
    } finally {
      setLoading(false);
    }
  };

  const generateQRCodeSVG = (data) => {
    // Simple QR code placeholder - in real implementation, you'd use a proper QR library
    return (
      <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center border-2 border-green-300">
        <div className="grid grid-cols-8 gap-0.5">
          {Array.from({ length: 64 }, (_, i) => (
            <div
              key={i}
              className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-green-800' : 'bg-green-100'} rounded-sm`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-green-300/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-gradient-to-r from-teal-300/20 to-green-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 right-1/3 w-32 h-32 bg-gradient-to-r from-emerald-300/20 to-green-500/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full mb-6 shadow-lg hover:shadow-xl transition-shadow">
            <Leaf className="w-8 h-8 animate-pulse" />
            <h1 className="text-3xl font-bold">Tea Supply Chain Tracker</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Trace the complete journey of premium tea products from garden to cup with blockchain transparency
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 p-8 mb-8 hover:shadow-3xl transition-shadow">
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-4 mb-6 animate-shake">
              <div className="flex items-center gap-2 text-red-700">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
                {error}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative group">
              <input
                type="text"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                placeholder="Enter batch ID to track your tea journey..."
                className="w-full px-6 py-4 text-lg bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl focus:border-green-400 focus:outline-none transition-all group-hover:border-green-300 pl-12"
              />
              <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
            </div>
            <button
              onClick={mockTrackProduct}
              disabled={loading}
              className={`px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-3 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Tracking...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Track Product
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {product && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            {/* Product Information Card */}
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 p-8 hover:shadow-3xl transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Product Information
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <p className="text-sm text-gray-500 mb-2">Batch ID</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {product.batchId}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-4 border border-green-100">
                      <p className="text-sm text-gray-500 mb-1">Product Name</p>
                      <p className="font-semibold text-gray-800">{product.productName}</p>
                    </div>
                    <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-4 border border-green-100">
                      <p className="text-sm text-gray-500 mb-1">Origin</p>
                      <p className="font-semibold text-gray-800">{product.origin}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-4 border border-green-100">
                      <p className="text-sm text-gray-500 mb-1">Grade</p>
                      <p className="font-semibold text-gray-800">{product.grade}</p>
                    </div>
                    <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-4 border border-green-100">
                      <p className="text-sm text-gray-500 mb-1">Quantity</p>
                      <p className="font-semibold text-gray-800">{product.quantity} kg</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <p className="text-sm text-gray-500 mb-3">Current Stage</p>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${getStageColor(stages[product.currentStage])} text-white rounded-full font-semibold shadow-lg`}>
                      {getStageIcon(stages[product.currentStage])}
                      {stages[product.currentStage]}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-4 border border-green-100">
                    <p className="text-sm text-gray-500 mb-1">Created Date</p>
                    <p className="font-semibold text-gray-800">
                      {product.timestamp.toLocaleDateString()} {product.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* QR Code Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 p-8 text-center hover:shadow-3xl transition-shadow">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Authenticity QR Code
                  </h3>
                </div>
                <div className="flex justify-center mb-4">
                  {generateQRCodeSVG(JSON.stringify({
                    batchId: product.batchId,
                    productName: product.productName,
                    type: 'tea-supply-chain'
                  }))}
                </div>
                <p className="text-gray-600">Scan to verify product authenticity</p>
              </div>
            </div>

            {/* Supply Chain Journey */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 p-8 hover:shadow-3xl transition-shadow">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Supply Chain Journey
                </h2>
              </div>

              <div className="space-y-6">
                {productHistory.map((step, index) => (
                  <div key={index} className="relative animate-slide-in" style={{ animationDelay: `${index * 200}ms` }}>
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className={`w-12 h-12 bg-gradient-to-r ${getStageColor(step.stageName)} rounded-full flex items-center justify-center text-white shadow-lg`}>
                          {getStageIcon(step.stageName)}
                        </div>
                        {index < productHistory.length - 1 && (
                          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-green-300 to-emerald-400"></div>
                        )}
                      </div>
                      <div className="flex-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-bold text-gray-800">{step.stageName}</h3>
                          <div className={`px-3 py-1 bg-gradient-to-r ${getStageColor(step.stageName)} text-white text-xs rounded-full font-semibold`}>
                            Completed
                          </div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-green-500" />
                            <span><strong>Location:</strong> {step.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-green-500" />
                            <span><strong>Handler:</strong> {step.handler.slice(0, 6)}...{step.handler.slice(-4)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-500" />
                            <span><strong>Date:</strong> {step.timestamp.toLocaleDateString()} {step.timestamp.toLocaleTimeString()}</span>
                          </div>
                          {step.notes && (
                            <div className="mt-3 p-3 bg-white rounded-lg border border-green-200">
                              <span className="text-gray-700">{step.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Future stages */}
                {stages.slice(product.currentStage + 1).map((stage, index) => (
                  <div key={`future-${index}`} className="relative opacity-60">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white">
                          {getStageIcon(stage)}
                        </div>
                        {index < stages.slice(product.currentStage + 1).length - 1 && (
                          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-300"></div>
                        )}
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-500">{stage}</h3>
                          <div className="px-3 py-1 bg-gray-300 text-gray-600 text-xs rounded-full font-semibold">
                            Pending
                          </div>
                        </div>
                        <p className="text-sm text-gray-400">Awaiting processing...</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tea leaf decorative elements */}
        <div className="fixed bottom-10 left-10 opacity-10 pointer-events-none">
          <Leaf className="w-20 h-20 text-green-600 animate-pulse" />
        </div>
        <div className="fixed top-20 right-20 opacity-10 pointer-events-none">
          <Leaf className="w-16 h-16 text-emerald-600 animate-pulse delay-1000" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ProductTracker;