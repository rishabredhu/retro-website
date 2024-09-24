import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { initialEvents, initialLearnings, initialCompleted, Update } from './updatesData';

/**
 * LatestUpdate Component
 * 
 * This component displays a retro-styled pop-up with the latest update information.
 * It appears with a fade-in and slide-up animation after a short delay.
 * The pop-up includes a title, a status message, and a link for more information.
 * 
 * Features:
 * - Smooth entrance animation using Framer Motion.
 * - Retro design with pixelated borders and glowing text.
 * - Interactive elements with hover effects.
 * - Improved typography for better readability.
 */
export default function LatestUpdate() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Set a timer to make the pop-up visible after 1 second
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  /**
   * Handles the click event on the "Hackathon Podcast Group" link.
   * Prevents the default action and logs a message to the console.
   * You can replace the console.log with your modal or navigation logic.
   * 
   * @param e - The click event object
   */
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    // Add your modal or navigation logic here
    console.log("More info about Hackathon Podcast Group")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 left-4 z-50"
    >
      <div className="bg-black bg-opacity-90 rounded-lg p-4 w-64 border-4 border-green-400 shadow-[0_0_10px_#4ade80] retro-box">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-green-400 font-bold text-sm uppercase tracking-wider retro-text">Latest Update</h2>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <p className="text-green-200 text-xs font-light mb-2 retro-text">
          Last seen at AGI Hack @Bay Area
        </p>
        <div className="flex justify-between items-center text-xs">
          <span className="text-green-300 retro-text">AGI Hack House</span>
          <a 
            href="#" 
            className="text-light-green-400 hover:text-green-200 transition-colors duration-300 retro-text"
            onClick={handleLinkClick}
          >
            GenAI Podcast Group @BerkeleySF
          </a>
        </div>
      </div>
      {/* Styles moved to a separate CSS file or styled-components */}
      {/* Import the styles from a separate CSS file or use a CSS-in-JS solution */}
      {/* Example using CSS modules: */}
      {/* import styles from './LatestUpdate.module.css' */}
      {/* Then use className={styles.retroBox} and className={styles.retroText} */}
      
      {/* If using styled-components, define components like: */}
      {/* const RetroBox = styled.div`
        image-rendering: pixelated;
        box-shadow: 0 0 0 4px #000, 0 0 0 8px #4ade80;
      ` */}
      {/* const RetroText = styled.span`
        font-family: 'VT323', 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.5;
        letter-spacing: 0.5px;
      ` */}
      {/* Then use <RetroBox> and <RetroText> in your JSX */}
    </motion.div>
  )
}
