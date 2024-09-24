import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useGoogleAnalytics } from '../src/hooks/useGoogleAnalytics'

// App.tsx
import { BrowserRouter } from 'react-router-dom';
import {Navbar} from './layouts/Navbar';

import Hero from './components/hero/Hero';

import StarCanvas from './components/ui/StarCanvas';
import LatestUpdate from './components/update-bar/LatestUpdate';
import ChatBot from './components/chatbot/holographic';
import LiquidBorder from './components/border/liquidBorder';

import FutureAgent from './components/chatbot/holographic';
import GameAgent from './components/chatbot/retroArcade'; 
import SpectralBackground from './components/ui/spectral-background';



/**
 * App Component
 * 
 * This is the main component of the application. It sets up the overall structure
 * and manages the state for the chatbot functionality.
 */
const App: React.FC = () => {
  useGoogleAnalytics();

  // Initialize scrollContainer ref for managing scroll behavior
  const scrollContainer = useRef<HTMLDivElement>(null);

  // Define state for the current chatbot, initialized to 'holographic'
  const [currentChatbot, setCurrentChatbot] = useState<string>('holographic');
  const [isAutoSwitching, setIsAutoSwitching] = useState<boolean>(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoSwitching) {
      intervalId = setInterval(() => {
        switchChatbot();
      }, 10000); // Switch every 10 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoSwitching]);

  const switchChatbot = () => {
    setCurrentChatbot((prevChatbot) => {
      switch (prevChatbot) {
        case 'holographic':
          return 'retroArcade';
        case 'retroArcade':
          return 'holographic';
        default:
          return 'holographic';
      }
    });
  };

  const toggleAutoSwitch = () => {
    setIsAutoSwitching((prev) => !prev);
  };

  const renderChatbot = () => {
    switch (currentChatbot) {
      case 'holographic':
        return <FutureAgent />;
      case 'retroArcade':
        return <GameAgent />;
      default:
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

              {/* {renderChatbot()} */}
            </div>
          </div>
          <LiquidBorder />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
