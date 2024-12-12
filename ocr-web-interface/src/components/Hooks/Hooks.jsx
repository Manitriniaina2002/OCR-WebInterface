import { useState, useEffect } from 'react';

// Hook personnalisé pour la détection responsive
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024
      });
    };

    // Ajouter l'écouteur d'événements
    window.addEventListener('resize', handleResize);

    // Nettoyer l'écouteur
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

// Fonction utilitaire pour le touch/click
export const useTouchClick = () => {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return {
    isTouchDevice,
    clickEvent: isTouchDevice ? 'touchstart' : 'click'
  };
};