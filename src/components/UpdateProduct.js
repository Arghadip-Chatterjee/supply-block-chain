import React, { useState } from 'react';
import { Search, Package, ArrowRight, CheckCircle, Clock, Truck, Store, Factory, Leaf, Eye } from 'lucide-react';

const UpdateProduct = ({ userRole = 'Processor' }) => {
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [product, setProduct] = useState(null);
  const [batchId, setBatchId] = useState('');
  const [notes, setNotes] = useState('');

  const stageMapping = {
    'Processor': { from: 0, to: 1, stageName: 'Processing', icon: Factory },
    'Warehouse': { from: 1, to: 2, stageName: 'Warehousing', icon: Package },
    'Distributor': { from: 2, to: 3, stageName: 'Distribution', icon: Truck },
    'Retailer': { from: 3, to: 4, stageName: 'Retail', icon: Store }
  };

  const getStageConfig = (stage) => {
    const stages = [
      { name: 'Cultivation', icon: Leaf, color: 'from-green-400 to-green-600' },
      { name: 'Processing', icon: Factory, color: 'from-emerald-400 to-emerald-600' },
      { name: 'Warehousing', icon: Package, color: 'from-teal-400 to-teal-600' },
      { name: 'Distribution', icon: Truck, color: 'from-green-500 to-green-700' },
      { name: 'Retail', icon: Store, color: 'from-lime-400 to-lime-600' },
      { name: 'Sold', icon: CheckCircle, color: 'from-green-600 to-green-800' }
    ];
    return stages[stage] || { name: 'Unknown', icon: Clock, color: 'from-gray-400 to-gray-600' };
  };

  // Mock search function for demo
  const searchProduct = async () => {
    if (!batchId.trim()) {
      setError('Please enter a batch ID');
      return;
    }

    setSearchLoading(true);
    setError('');
    setProduct(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProduct({
        id: '1',
        batchId: batchId,
        productName: 'Premium Organic Coffee',
        origin: 'Costa Rica Highlands',
        grade: 'Grade A Premium',
        quantity: '500',
        currentStage: 0, // Cultivation stage for demo
        currentOwner: '0x1234...5678',
        timestamp: new Date().toLocaleDateString()
      });

    } catch (err) {
      setError('Product not found or error occurred');
    } finally {
      setSearchLoading(false);
    }
  };

  const canUpdateProduct = () => {
    if (!product || !stageMapping[userRole]) return false;
    const expectedStage = stageMapping[userRole].from;
    return product.currentStage === expectedStage;
  };

  const updateProductStage = async () => {
    if (!product || !canUpdateProduct()) {
      setError('Cannot update this product at current stage');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSuccess(`Product successfully updated to ${stageMapping[userRole].stageName} stage!`);
      
      // Update product stage locally
      setProduct(prev => ({
        ...prev,
        currentStage: stageMapping[userRole].to
      }));
      setNotes('');

    } catch (err) {
      setError('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-200/20 to-green-300/30 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg animate-bounce">
            <Package className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Update Product Stage
          </h1>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            Track and update your products through the supply chain as a{' '}
            <span className="font-semibold text-emerald-600">{userRole}</span>
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
          {/* Alert Messages */}
          {error && (
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 m-6 rounded-2xl shadow-lg animate-shake">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3">!</div>
                {error}
              </div>
            </div>
          )}

          {success && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 m-6 rounded-2xl shadow-lg animate-slide-down">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 mr-3" />
                {success}
              </div>
            </div>
          )}

          <div className="p-8">
            {/* Search Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <Search className="w-7 h-7 mr-3 text-emerald-600" />
                Find Your Product
              </h2>
              
              <div className="flex gap-4 flex-col md:flex-row items-center">
                <div className="flex-1">
                  <input
                    type="text"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    placeholder="Enter batch ID to search..."
                    className="w-full px-2 py-4 text-lg border-2 border-green-200 rounded-2xl focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-gradient-to-r from-green-50/50 to-emerald-50/50"
                  />
                </div>
                <button
                  onClick={searchProduct}
                  disabled={searchLoading}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none transition-all duration-300 flex items-center min-w-[140px] justify-center"
                >
                  {searchLoading ? (
                    <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <>
                      <Eye className="w-5 h-5 mr-2" />
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Product Details */}
            {product && (
              <div className="animate-slide-up">
                <div className="h-px bg-gradient-to-r from-transparent via-green-300 to-transparent mb-8"></div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 mb-8 shadow-inner border border-green-100">
                  <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                    <Package className="w-7 h-7 mr-3 text-emerald-600" />
                    Product Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: 'Batch ID', value: product.batchId, highlight: true },
                      { label: 'Product Name', value: product.productName },
                      { label: 'Origin', value: product.origin },
                      { label: 'Grade', value: product.grade },
                      { label: 'Quantity', value: `${product.quantity} kg` },
                      { label: 'Created', value: product.timestamp }
                    ].map((item, index) => (
                      <div key={index} className="group hover:scale-105 transition-transform duration-300">
                        <div className={`p-4 rounded-2xl ${item.highlight ? 'bg-gradient-to-r from-emerald-100 to-green-100 border-2 border-emerald-200' : 'bg-white/60 border border-green-100'} shadow-lg`}>
                          <p className="text-sm font-medium text-green-700 mb-1">{item.label}</p>
                          <p className={`text-lg ${item.highlight ? 'font-bold text-emerald-800' : 'font-semibold text-green-800'}`}>
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Current Stage Display */}
                  <div className="mt-8">
                    <p className="text-sm font-medium text-green-700 mb-3">Current Stage</p>
                    <div className="flex items-center">
                      {(() => {
                        const stageConfig = getStageConfig(product.currentStage);
                        const StageIcon = stageConfig.icon;
                        return (
                          <div className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r ${stageConfig.color} text-white font-semibold shadow-lg animate-pulse`}>
                            <StageIcon className="w-5 h-5 mr-2" />
                            {stageConfig.name}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* Update Section */}
                {canUpdateProduct() ? (
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8 border-2 border-emerald-200 shadow-lg">
                    <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                      <ArrowRight className="w-7 h-7 mr-3 text-emerald-600 animate-bounce-x" />
                      Update to {stageMapping[userRole].stageName} Stage
                    </h3>
                    
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={`Add notes about the ${stageMapping[userRole].stageName.toLowerCase()} process...`}
                      className="w-full p-6 border-2 border-green-200 rounded-2xl focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300 resize-none bg-white/80 text-green-900 placeholder-green-500"
                      rows={4}
                    />
                    
                    <button
                      onClick={updateProductStage}
                      disabled={loading}
                      className="mt-6 w-full py-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center">
                        {loading ? (
                          <>
                            <div className="animate-spin w-7 h-7 border-3 border-white border-t-transparent rounded-full mr-3"></div>
                            Processing Update...
                          </>
                        ) : (
                          <>
                            {(() => {
                              const StageIcon = stageMapping[userRole].icon;
                              return <StageIcon className="w-7 h-7 mr-3" />;
                            })()}
                            Update to {stageMapping[userRole].stageName}
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-blue-800 font-semibold text-lg">
                          Product Not Ready for {userRole} Stage
                        </p>
                        <p className="text-blue-700">
                          Current stage: {getStageConfig(product.currentStage).name}
                          {stageMapping[userRole] && (
                            <> (Expected: {getStageConfig(stageMapping[userRole].from).name})</>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-slide-down { animation: slide-down 0.5s ease-out; }
        .animate-shake { animation: shake 0.6s ease-in-out; }
        .animate-bounce-x { animation: bounce-x 2s infinite; }
      `}</style>
    </div>
  );
};

export default UpdateProduct;