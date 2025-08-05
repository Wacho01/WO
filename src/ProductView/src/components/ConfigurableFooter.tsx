import React from 'react';
import { ProductConfig } from '../config/productConfig';

interface ConfigurableFooterProps {
  config: ProductConfig;
}

const ConfigurableFooter: React.FC<ConfigurableFooterProps> = ({ config }) => {
  return (
    <>
      {/* Footer Background - positioned in front of canvas */}
      <div className="footer_background" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100vw',
        height: '14vh',
        background: '#2a9cd7',
        zIndex: 90,
        pointerEvents: 'none',
        boxSizing: 'border-box'
      }}></div>

      {/* Model Info Frame */}
      <div className="frame" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100vw',
        height: '15vh',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'left',
        padding: 0,
        zIndex: 100,
        pointerEvents: 'none',
        boxSizing: 'border-box'
      }}> 
        <span className="frame__title" style={{
          color: '#fff',
          position: 'absolute',
          fontWeight: 600,
          fontSize: 'clamp(0.8em, 3vw, 1.8em)',
          display: 'inline-block',
          fontFamily: 'Raleway, sans-serif',
          pointerEvents: 'auto',
          left: 'clamp(50px, 8vw, 100px)',
          bottom: 'clamp(15px, 4vh, 41px)',
          margin: 0
        }}>{config.product.name}</span>
        <span className="frame_vertical" style={{
          borderLeft: '2px solid #fff',
          height: 'clamp(30px, 6vh, 50px)',
          position: 'absolute',
          left: 'clamp(300px, 25vw, 355px)',
          bottom: 'clamp(15px, 2.5vh, 40px)',
          margin: 0
        }}></span>
        <span className="frame__category" style={{
          position: 'absolute',
          fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
          display: 'inline-block',
          color: '#fff',
          fontFamily: 'Raleway, sans-serif',
          pointerEvents: 'auto',
          left: 'clamp(320px, 27vw, 375px)',
          bottom: 'clamp(10px, 5vh, 45px)',
          margin: 0
        }}>{config.product.category}</span>
        <span className="frame__subcategory" style={{
          position: 'absolute',
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          display: 'inline-block',
          color: '#fff',
          fontFamily: 'Raleway, sans-serif',
          pointerEvents: 'auto',
          left: 'clamp(320px, 27vw, 375px)',
          bottom: 'clamp(10px, 2vh, 45px)',
          margin: 0
        }}>{config.product.subcategory}</span>
      </div>
    </>
  );
};

export default ConfigurableFooter;