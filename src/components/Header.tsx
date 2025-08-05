import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <div className="relative">
      {/* Admin Button - Fixed position in upper left */}
      <button
        onClick={handleAdminClick}
        className="fixed top-4 left-4 z-50 flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group"
        style={{ color: '#217cac' }}
      >
        <Settings className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
        <span className="font-medium text-sm">Admin</span>
      </button>

      <div className="relative bg-white pt-16 pb-8">
        {/* Wave Shape */}
        <div className="absolute bottom-0 w-full">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[500px] bottom-0"
          >
            <path
              d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
              fill="#2a9cd7"
            />
          </svg>
        </div>
        
        <div className="relative z-10 text-center bottom-16">
          <div className="w-32 h-32 mx-auto mb-4 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-4xl font-bold text-white">WO</span>
          </div>
          <h2 className="absolute w-full top-16" style={{ color: '#217cac' }}>
            <span className="relative text-[20px] font-light tracking-normal font-work-sans font-bold left-[110px]">
              Digital Catalog
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Header;