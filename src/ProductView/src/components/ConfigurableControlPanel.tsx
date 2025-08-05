import React, { useState, useEffect } from 'react';
import ConfigurableDimensionsModal from './ConfigurableDimensionsModal';

interface ConfigurableControlPanelProps {
  onTextureChange: (texture: string) => void;
  onColorChange: (color: string) => void;
  currentTexture: string;
  currentColor: string;
  productConfig: any;
}

const ConfigurableControlPanel: React.FC<ConfigurableControlPanelProps> = ({
  onTextureChange,
  onColorChange,
  currentTexture,
  currentColor,
  productConfig
}) => {
  const [showDimensions, setShowDimensions] = useState(false);
  const [activeTab, setActiveTab] = useState('texture');

  const textures = [
    { id: 'ROCK1', name: 'Rock 1', image: '/textures/ROCK1.jpg' },
    { id: 'ROCK2', name: 'Rock 2', image: '/textures/ROCK2.jpg' },
    { id: 'GRASS1', name: 'Grass 1', image: '/textures/GRASS1.jpg' },
    { id: 'GRASS2', name: 'Grass 2', image: '/textures/GRASS2.jpg' }
  ];

  const colors = [
    { id: 'COLOR2', name: 'Blue', color: '#0066cc' },
    { id: 'COLOR3', name: 'Green', color: '#00cc66' },
    { id: 'default', name: 'Default', color: '#666666' }
  ];

  return (
    <div className="control-panel">
      <div className="control-tabs">
        <button 
          className={`tab ${activeTab === 'texture' ? 'active' : ''}`}
          onClick={() => setActiveTab('texture')}
        >
          Textures
        </button>
        <button 
          className={`tab ${activeTab === 'color' ? 'active' : ''}`}
          onClick={() => setActiveTab('color')}
        >
          Colors
        </button>
        <button 
          className="tab"
          onClick={() => setShowDimensions(true)}
        >
          Dimensions
        </button>
      </div>

      {activeTab === 'texture' && (
        <div className="texture-options">
          {textures.map((texture) => (
            <button
              key={texture.id}
              className={`texture-btn ${currentTexture === texture.id ? 'active' : ''}`}
              onClick={() => onTextureChange(texture.id)}
              style={{
                backgroundImage: `url(${texture.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {texture.name}
            </button>
          ))}
        </div>
      )}

      {activeTab === 'color' && (
        <div className="color-options">
          {colors.map((color) => (
            <button
              key={color.id}
              className={`color-btn ${currentColor === color.id ? 'active' : ''}`}
              onClick={() => onColorChange(color.id)}
              style={{ backgroundColor: color.color }}
            >
              {color.name}
            </button>
          ))}
        </div>
      )}

      {showDimensions && (
        <ConfigurableDimensionsModal
          isOpen={showDimensions}
          onClose={() => setShowDimensions(false)}
          productConfig={productConfig}
        />
      )}

      <style jsx>{`
        .control-panel {
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          min-width: 200px;
        }

        .control-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }

        .tab {
          padding: 8px 12px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s;
        }

        .tab:hover {
          background: #f5f5f5;
        }

        .tab.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }

        .texture-options,
        .color-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .texture-btn,
        .color-btn {
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          font-size: 11px;
          color: white;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
          transition: all 0.2s;
          min-height: 40px;
        }

        .texture-btn:hover,
        .color-btn:hover {
          border-color: #007bff;
          transform: scale(1.02);
        }

        .texture-btn.active,
        .color-btn.active {
          border-color: #007bff;
          border-width: 3px;
        }

        .color-btn {
          color: white;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default ConfigurableControlPanel;