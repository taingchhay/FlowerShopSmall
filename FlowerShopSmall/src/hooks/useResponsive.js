import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [breakpoint, setBreakpoint] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        height: window.innerHeight,
      });

      // Bootstrap breakpoints
      if (width < 576) {
        setBreakpoint('xs');
      } else if (width < 768) {
        setBreakpoint('sm');
      } else if (width < 992) {
        setBreakpoint('md');
      } else if (width < 1200) {
        setBreakpoint('lg');
      } else {
        setBreakpoint('xl');
      }
    };

    // Set initial values
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize.width < 768;
  const isTablet = screenSize.width >= 768 && screenSize.width < 992;
  const isDesktop = screenSize.width >= 992;
  const isSmallMobile = screenSize.width < 576;

  return {
    screenSize,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isSmallMobile,
  };
};
