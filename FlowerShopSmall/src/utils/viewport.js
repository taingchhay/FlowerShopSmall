// Utility to handle mobile viewport height issues
export const setViewportHeight = () => {
  // Get the actual viewport height
  const vh = window.innerHeight * 0.01;
  
  // Set the CSS custom property
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Initialize viewport height on load and resize
export const initViewport = () => {
  setViewportHeight();
  
  // Listen for resize events
  window.addEventListener('resize', setViewportHeight);
  
  // Listen for orientation change on mobile
  window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 100);
  });
  
  // Handle mobile browser address bar changes
  window.addEventListener('scroll', setViewportHeight);
};

// Clean up event listeners
export const cleanupViewport = () => {
  window.removeEventListener('resize', setViewportHeight);
  window.removeEventListener('orientationchange', setViewportHeight);
  window.removeEventListener('scroll', setViewportHeight);
};
