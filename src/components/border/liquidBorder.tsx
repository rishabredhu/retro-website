'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * Particle interface defines the structure of a particle in the liquid border
 */
interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
}

/**
 * LiquidBorder component creates a subtle, animated border effect
 * that blends with the background
 */
export default function LiquidBorder() {
  const pathRef = useRef<SVGPathElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const particleCount = 30 // Reduced particle count for subtlety

    // Initialize particles
    const initialParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5, // Reduced particle size
      speedX: (Math.random() - 0.5) * 1, // Reduced speed
      speedY: (Math.random() - 0.5) * 1, // Reduced speed
    }))
    setParticles(initialParticles)

    const animate = () => {
      if (pathRef.current) {
        const time = Date.now() * 0.0005 // Slowed down animation
        const path = pathRef.current

        let d = `M0,0 `
        for (let i = 0; i <= width; i += 20) { // Increased step for smoother curve
          const y = Math.sin(i * 0.005 + time) * 10 // Reduced amplitude
          d += `L${i},${y} `
        }
        d += `L${width},0 L${width},${height} `
        for (let i = width; i >= 0; i -= 20) { // Increased step for smoother curve
          const y = Math.sin(i * 0.005 + time) * 10 + height // Reduced amplitude
          d += `L${i},${y} `
        }
        d += 'Z'

        path.setAttribute('d', d)

        // Update particle positions
        setParticles((prevParticles) =>
          prevParticles.map((particle) => {
            let newX = particle.x + particle.speedX
            let newY = particle.y + particle.speedY

            // Bounce off edges
            if (newX < 0 || newX > width) particle.speedX *= -1
            if (newY < 0 || newY > height) particle.speedY *= -1

            return {
              ...particle,
              x: newX,
              y: newY,
            }
          })
        )
      }
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <svg className="w-full h-full">
        <defs>
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0.1)" /> 
            <stop offset="50%" stopColor="rgba(255, 0, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(0, 255, 255, 0.1)" />
          </linearGradient>
          <radialGradient id="particleGradient">
            <stop offset="0%" stopColor="rgba(235, 245, 255, 0.3)" /> 
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>
        </defs>
        <path
          ref={pathRef}
          fill="none"
          stroke="url(#borderGradient)"
          strokeWidth="4" 
          strokeLinecap="round"
        />
        {particles.map((particle, index) => (
          <circle
            key={index}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill="url(#particleGradient)"
          >
            <animate
              attributeName="opacity"
              values="0.2;0.5;0.2" 
              dur={`${Math.random() * 3 + 2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  )
}