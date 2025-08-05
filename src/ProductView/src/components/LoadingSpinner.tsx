import React from 'react';

interface LoadingSpinnerProps {
  progress?: number;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  progress = 0, 
  message = 'Loading Scene...' 
}) => {
  return (
    <>
      {/* White semi-transparent overlay - exact from original */}
      <div className="loading-overlay"></div>
      
      {/* Original loading div element with water wave animation - exact from original HTML file */}
      <div className="loading" id="js-loader"></div>
    </>
  );
};

export default LoadingSpinner;