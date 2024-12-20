import React from 'react';

const Without = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center">
      <div className="text-center text-white px-6 md:px-12 py-12 md:py-24 w-full max-w-md bg-opacity-70 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold mb-4">
          Welcome to <span className="text-yellow-300">EcommerceBot</span>
        </h1>
        <p className="text-lg mb-6">
          Your personal assistant to help you navigate through the best deals and recommendations. Let's get started!
        </p>
        
        {/* Sign In & Sign Up Buttons */}
        <div className="space-y-4">
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
            Sign In
          </button>
          <button className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
            Sign Up
          </button>
        </div>
        
        {/* Optional: Chatbot Introduction */}
        <div className="mt-8">
          <p className="text-sm text-gray-200">
            Need help? Chat with our <span className="font-semibold">EcommerceBot</span> to get product suggestions!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Without;
