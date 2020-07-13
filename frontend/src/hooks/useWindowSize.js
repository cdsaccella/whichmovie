import { useState, useEffect } from 'react';

function useWindowSize() {
  const isClient = typeof window === 'object';
  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  });

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize({
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  return windowSize;
}

export default useWindowSize;
