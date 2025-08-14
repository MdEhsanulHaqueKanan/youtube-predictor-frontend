
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto">
        <div className="absolute inset-0 border-4 border-gray-600 rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-transparent border-t-fuchsia-500 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-300">Predicting...</p>
    </div>
  );
};

export default Spinner;
