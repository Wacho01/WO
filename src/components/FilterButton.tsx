import React from 'react';

interface FilterButtonProps {
  label: string;
  category: string;
  isActive: boolean;
  onClick: (category: string) => void;
  disabled?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({ 
  label, 
  category, 
  isActive, 
  onClick, 
  disabled = false 
}) => {
  return (
    <button
      onClick={() => !disabled && onClick(category)}
      disabled={disabled}
      className={`
        relative flex flex-col items-center justify-start
        w-20 h-32 text-xs font-light uppercase
        border border-black rounded-md transition-all duration-300
        font-raleway
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      `}
      style={{
        backgroundColor: isActive ? '#181818' : '#2a9cd7',
        color: 'white'
      }}
      onMouseEnter={(e) => {
        if (!disabled && !isActive) {
          e.currentTarget.style.backgroundColor = '#181818';
          e.currentTarget.style.opacity = '0.8';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isActive) {
          e.currentTarget.style.backgroundColor = '#2a9cd7';
          e.currentTarget.style.opacity = '1';
        }
      }}
    >
      <span className="text-center px-1 leading-tight pt-3">{label}</span>
      {isActive && (
        <div className="absolute bottom-0 right-1 w-18 h-14 flex items-center justify-center">
          <img 
            src="/src/assets/wologo_w.png" 
            alt="WO Logo" 
            className="w-full h-full object-contain"
            onError={(e) => {
              console.error('Failed to load wologo_w.png from /src/assets/wologo_w.png');
              // Try alternative paths
              const alternatives = [
                '/public/img/wologo_w.png',
                '/img/wologo_w.png',
                '/assets/wologo_w.png'
              ];
              const img = e.currentTarget;
              const currentSrc = img.src;
              const nextAlt = alternatives.find(alt => !currentSrc.includes(alt));
              if (nextAlt) {
                console.log(`Trying alternative path: ${nextAlt}`);
                img.src = nextAlt;
              } else {
                console.log('All alternative paths failed, hiding image');
                img.style.display = 'none';
              }
            }}
          />
        </div>
      )}
    </button>
  );
};

export default FilterButton;