import { useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-YMDVGZ1702';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * A custom React hook to initialize and set up Google Analytics tracking.
 * 
 * This hook dynamically loads the Google Analytics script and sets up the
 * global gtag function for tracking. It should be called once at the top level
 * of your React application.
 *
 * @example
 * // In your App.tsx or a top-level component
 * import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';
 * 
 * function App() {
 *   useGoogleAnalytics();
 *   // ... rest of your component
 * }
 */
export const useGoogleAnalytics = () => {
  useEffect(() => {
    // Load the script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, []);
};