import React, { useState } from 'react';
import { Leaf, Plus, Zap, MapPin, Weight, FileText, Award, Package, QrCode, Sparkles } from 'lucide-react';

const CreateProduct = () => {
  // Mock Web3 context for demonstration
  const contract = { createProduct: () => Promise.resolve({ wait: () => Promise.resolve() }) };
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [createdProduct, setCreatedProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    batchId: '',
    productName: '',
    origin: '',
    grade: '',
    quantity: '',
    notes: ''
  });

  const teaGrades = [
    'FTGFOP', 'TGFOP', 'GFOP', 'FOP', 'OP', 'PEKOE', 'BOP', 'BOPF', 'CTC', 'Dust'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateBatchId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const batchId = `TEA-${timestamp}-${random}`;
    setFormData(prev => ({
      ...prev,
      batchId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!contract) {
      setError('Contract not connected');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Mock successful creation
      setTimeout(() => {
        setSuccess('Product created successfully!');
        setCreatedProduct({
          batchId: formData.batchId,
          productName: formData.productName
        });

        setFormData({
          batchId: '',
          productName: '',
          origin: '',
          grade: '',
          quantity: '',
          notes: ''
        });
        setLoading(false);
      }, 2000);

    } catch (err) {
      console.error('Error creating product:', err);
      setError(err.reason || err.message || 'Failed to create product');
      setLoading(false);
    }
  };

  // Mock QR Code component
  const QRCodeDisplay = ({ value, size }) => (
    <div className={`bg-white p-4 rounded-lg shadow-lg`} style={{ width: size + 32, height: size + 32 }}>
      <div 
        className="bg-gray-900 rounded-lg flex items-center justify-center text-white font-mono text-xs"
        style={{ width: size, height: size }}
      >
        <QrCode size={size * 0.8} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-br from-teal-200 to-green-300 rounded-full opacity-20 animate-bounce" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full opacity-10 animate-ping" style={{animationDuration: '6s'}}></div>
        
        {/* Floating Tea Leaves */}
        <div className="absolute top-1/4 left-1/3 animate-float" style={{animationDelay: '0s'}}>
          <Leaf className="w-8 h-8 text-green-300 opacity-30" />
        </div>
        <div className="absolute top-2/3 right-1/3 animate-float" style={{animationDelay: '2s'}}>
          <Leaf className="w-6 h-6 text-emerald-300 opacity-40" />
        </div>
        <div className="absolute top-1/2 left-1/4 animate-float" style={{animationDelay: '4s'}}>
          <Leaf className="w-10 h-10 text-teal-300 opacity-25" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Hero Header */}
        <div className="text-center mb-8 relative">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Package className="w-16 h-16 text-green-600 animate-bounce" />
              <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-2 -right-2 animate-ping" />
            </div>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 animate-slide-up">
            Create New Tea Product
          </h1>
          <p className="text-xl text-green-700 font-semibold animate-fade-in-delayed">
            Register a premium tea batch in our blockchain supply chain system
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-expand"></div>
            <Leaf className="w-6 h-6 text-green-500 animate-spin-slow" />
            <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-expand" style={{animationDelay: '0.5s'}}></div>
          </div>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-100 to-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-3"></div>
              <span className="font-bold text-red-700">Error:</span>
              <span className="ml-2 text-red-600">{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-100 to-emerald-50 border-l-4 border-green-500 rounded-lg animate-slide-down">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3"></div>
              <span className="font-bold text-green-700">Success:</span>
              <span className="ml-2 text-green-600">{success}</span>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-green-100 animate-scale-up">
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-2 flex items-center">
                <Leaf className="w-8 h-8 mr-3 animate-bounce" />
                Product Information
              </h2>
              <p className="text-green-100">Enter the details of your premium tea batch</p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Batch ID */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-green-800 mb-3 uppercase tracking-wide flex items-center">
                  <Package className="w-4 h-4 mr-2" />
                  Batch ID
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="batchId"
                    value={formData.batchId}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., TEA-2024-001"
                    className="flex-1 p-4 border-2 border-green-100 rounded-xl focus:border-green-500 focus:outline-none font-mono text-lg transition-all duration-300 hover:border-green-300"
                  />
                  <button
                    type="button"
                    onClick={generateBatchId}
                    className="px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg flex items-center space-x-2 group"
                  >
                    <Zap className="w-5 h-5 group-hover:animate-bounce" />
                    <span>Generate</span>
                  </button>
                </div>
              </div>

              {/* Product Name */}
              <div className="group">
                <label className="block text-sm font-bold text-green-800 mb-3 uppercase tracking-wide flex items-center">
                  <Leaf className="w-4 h-4 mr-2" />
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Darjeeling Black Tea"
                  className="w-full p-4 border-2 border-green-100 rounded-xl focus:border-green-500 focus:outline-none font-semibold text-lg transition-all duration-300 hover:border-green-300 group-hover:shadow-lg"
                />
              </div>

              {/* Origin */}
              <div className="group">
                <label className="block text-sm font-bold text-green-800 mb-3 uppercase tracking-wide flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Origin
                </label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Darjeeling, West Bengal, India"
                  className="w-full p-4 border-2 border-green-100 rounded-xl focus:border-green-500 focus:outline-none font-semibold text-lg transition-all duration-300 hover:border-green-300 group-hover:shadow-lg"
                />
              </div>

              {/* Tea Grade */}
              <div className="group">
                <label className="block text-sm font-bold text-green-800 mb-3 uppercase tracking-wide flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Tea Grade
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 border-2 border-green-100 rounded-xl focus:border-green-500 focus:outline-none font-semibold text-lg transition-all duration-300 hover:border-green-300 group-hover:shadow-lg bg-white"
                >
                  <option value="">Select Tea Grade</option>
                  {teaGrades.map((grade) => (
                    <option key={grade} value={grade} className="font-semibold">
                      {grade}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="group">
                <label className="block text-sm font-bold text-green-800 mb-3 uppercase tracking-wide flex items-center">
                  <Weight className="w-4 h-4 mr-2" />
                  Quantity (kg)
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  min="1"
                  placeholder="Enter quantity in kg"
                  className="w-full p-4 border-2 border-green-100 rounded-xl focus:border-green-500 focus:outline-none font-semibold text-lg transition-all duration-300 hover:border-green-300 group-hover:shadow-lg"
                />
              </div>

              {/* Notes */}
              <div className="md:col-span-2 group">
                <label className="block text-sm font-bold text-green-800 mb-3 uppercase tracking-wide flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Additional information about the tea batch..."
                  className="w-full p-4 border-2 border-green-100 rounded-xl focus:border-green-500 focus:outline-none font-medium text-lg transition-all duration-300 hover:border-green-300 group-hover:shadow-lg resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="w-full py-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white text-xl font-black rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-green-500/25 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 relative overflow-hidden group"
                >
                  {loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 animate-pulse"></div>
                  )}
                  <div className="relative z-10 flex items-center space-x-3">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                        <span>Creating Product...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-6 h-6 group-hover:animate-bounce" />
                        <span>Create Product</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Display */}
        {createdProduct && (
          <div className="mt-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-green-100 animate-scale-up">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
              <h3 className="text-2xl font-black text-white flex items-center">
                <QrCode className="w-8 h-8 mr-3" />
                Product Created Successfully!
              </h3>
              <p className="text-emerald-100 mt-1">Your tea batch has been registered on the blockchain</p>
            </div>
            
            <div className="p-8 text-center">
              <div className="mb-6">
                <p className="text-lg font-bold text-green-800 mb-2">
                  QR Code for Batch: 
                  <span className="ml-2 bg-green-100 px-3 py-1 rounded-lg font-mono">
                    {createdProduct.batchId}
                  </span>
                </p>
                <p className="text-green-600 font-semibold">
                  Product: {createdProduct.productName}
                </p>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="transform hover:scale-105 transition-all duration-300">
                  <QRCodeDisplay
                    value={JSON.stringify({
                      batchId: createdProduct.batchId,
                      productName: createdProduct.productName,
                      type: 'tea-supply-chain'
                    })}
                    size={200}
                  />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                <p className="text-green-700 font-semibold flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                  Save this QR code for product tracking throughout the supply chain
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes slide-up {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in-delayed {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes expand {
          0% { width: 0; }
          100% { width: 5rem; }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes slide-down {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes scale-up {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 1s ease-out; }
        .animate-fade-in-delayed { animation: fade-in-delayed 1s ease-out 0.3s both; }
        .animate-expand { animation: expand 1s ease-out; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-slide-down { animation: slide-down 0.5s ease-out; }
        .animate-scale-up { animation: scale-up 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default CreateProduct;