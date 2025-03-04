import React from 'react';

const ErrorAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md text-center shadow-xl animate-pulse border border-red-500">
        <div className="w-16 h-16 bg-red-900 rounded-full mx-auto flex items-center justify-center">
          <svg className="w-8 h-8 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-red-300 mt-4">Registration Failed</h3>
        <p className="text-gray-300 mt-2">
          We couldn't process your registration at this time.
        </p>
        <p className="text-gray-300 mt-2">
          Please try again later or contact support if the issue persists.
        </p>
      </div>
    </div>
  );
};

export default ErrorAnimation;