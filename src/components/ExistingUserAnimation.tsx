import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const ExistingUserAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <motion.div 
        className="bg-gray-800 rounded-lg p-8 max-w-md text-center shadow-xl border border-amber-500"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          duration: 0.5
        }}
      >
        <motion.div 
          className="w-16 h-16 bg-amber-900 rounded-full mx-auto flex items-center justify-center"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <svg className="w-8 h-8 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </motion.div>
        <h3 className="text-xl font-bold text-amber-300 mt-4">Account Already Exists</h3>
        <p className="text-gray-300 mt-2">
          You already have an account with Cloud Community Club.
        </p>
        <p className="text-gray-300 mt-2">
          Please try logging in instead or use the password reset option if needed.
        </p>
      </motion.div>
    </div>
  );
};

export default ExistingUserAnimation; 