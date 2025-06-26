import React from 'react';
import { useResponsive } from '../hooks/useResponsive';

const ResponsiveDebug = () => {
  const { screenSize, breakpoint, isMobile, isTablet, isDesktop, isSmallMobile } = useResponsive();

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div 
      className="position-fixed bottom-0 start-0 bg-dark text-white p-2 rounded-end"
      style={{ 
        zIndex: 9999, 
        fontSize: '0.75rem',
        opacity: 0.8
      }}
    >
      <div>Screen: {screenSize.width}x{screenSize.height}</div>
      <div>Breakpoint: {breakpoint}</div>
      <div>
        {isSmallMobile && '📱 XS'} 
        {isMobile && !isSmallMobile && '📱 SM'} 
        {isTablet && '📱 MD'} 
        {isDesktop && '💻 LG+'}
      </div>
    </div>
  );
};

export default ResponsiveDebug;
