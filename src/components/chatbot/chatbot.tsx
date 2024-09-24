import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * ChatBot Component
 * 
 * This component creates an interactive chatbot interface with a 3D effect.
 * It responds to mouse movements, creating a dynamic visual experience.
 */
export default function ChatBot() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  /**
   * Calculates the rotation based on mouse position
   * @returns {string} CSS transform string for rotation
   */
  const calculateRotation = () => {
    const maxRotation = 5
    const xRotation = (mousePosition.y / window.innerHeight - 0.5) * maxRotation
    const yRotation = (mousePosition.x / window.innerWidth - 0.5) * -maxRotation
    return `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`
  }

  return (
    <div className="fixed bottom-0 left-0 w-full h-64 overflow-hidden z-40">
      <motion.div
        className="relative w-full h-full"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          transform: calculateRotation(),
        }}
        transition={{ type: 'spring', stiffness: 75, damping: 15 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${require('../../assets/cybercity.gif')})`,
            transform: 'translateZ(50px) scale(1.5)', // Increased scale from 1.1 to 1.5
          }}
        />
        <div
          className="absolute bottom-4 right-4 w-24 h-24 bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage: 'url(/placeholder.svg?height=96&width=96)',
            transform: 'translateZ(100px)',
          }}
        />
      </motion.div>
    </div>
  )
}