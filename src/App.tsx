import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useGoogleAnalytics } from '../src/hooks/useGoogleAnalytics'

// App.tsx
import { BrowserRouter } from 'react-router-dom';
import {Navbar} from './layouts/Navbar';

import Hero from './components/hero/Hero';

import StarCanvas from './components/ui/StarCanvas';
import LatestUpdate from './components/update-bar/LatestUpdate';
import LiquidBorder from './components/border/liquidBorder';

import FutureAgent from './components/chatbot/holographic';
import GameAgent from './components/chatbot/retroArcade'; 
import SpectralBackground from './components/ui/spectral-background';

/**
 * Logger function for development purposes
 * @param message - The message to log
 * @param data - Optional data to log
 */
const logger = (message: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[App] ${message}`, data);
  }
};

/**
 * App Component
 * 
 * This is the main component of the application. It sets up the overall structure
 * and manages the state for the chatbot functionality.
 */
const App: React.FC = () => {
  logger('App component rendered');
  useGoogleAnalytics();

  // Initialize scrollContainer ref for managing scroll behavior
  const scrollContainer = useRef<HTMLDivElement>(null);

  // Define state for the current chatbot, initialized to 'holographic'
  const [currentChatbot, setCurrentChatbot] = useState<string>('holographic');
  const [isAutoSwitching, setIsAutoSwitching] = useState<boolean>(true);

  useEffect(() => {
    logger('useEffect for auto-switching triggered', { isAutoSwitching });
    let intervalId: NodeJS.Timeout;

    if (isAutoSwitching) {
      intervalId = setInterval(() => {
        switchChatbot();
      }, 10000); // Switch every 10 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        logger('Auto-switching interval cleared');
      }
    };
  }, [isAutoSwitching]);

  const switchChatbot = () => {
    setCurrentChatbot((prevChatbot) => {
      const newChatbot = prevChatbot === 'holographic' ? 'retroArcade' : 'holographic';
      logger('Chatbot switched', { from: prevChatbot, to: newChatbot });
      return newChatbot;
    });
  };

  const toggleAutoSwitch = () => {
    setIsAutoSwitching((prev) => {
      const newState = !prev;
      logger('Auto-switch toggled', { newState });
      return newState;
    });
  };

  const renderChatbot = () => {
    logger('Rendering chatbot', { currentChatbot });
    switch (currentChatbot) {
      case 'holographic':
        return <FutureAgent />;
      case 'retroArcade':
        return <GameAgent />;
      default:
        logger('Unknown chatbot type, defaulting to FutureAgent');
        return <FutureAgent />;
    }
  };

  return (
    <>
      <Helmet>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YMDVGZ1702');
          `}
        </script>
      </Helmet>
      <BrowserRouter>
        <div className='relative z-0 bg-primary'>
          <StarCanvas />
          <Navbar />
          <div className='wrapper'>
            <Hero scrollContainer={scrollContainer} /> 
          </div>
          <div className="fixed bottom-4 right-4 z-50 flex items-end">
            <div>
              <LatestUpdate />
              
              <div className="relative w-full h-64 mb-4">
                <SpectralBackground />
              </div>

              {renderChatbot()}
            </div>
          </div>
          <LiquidBorder />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
