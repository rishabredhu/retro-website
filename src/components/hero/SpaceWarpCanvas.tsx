'use client'

import React, { useRef, useEffect } from 'react'

/**
 * Represents a star in the space warp effect.
 */
interface Star {
  x: number
  y: number
  z: number
  r: number
  color: string
}

/**
 * Represents a shooting star in the space warp effect.
 */
interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  active: boolean
  color: string
}

interface SpaceWarpCanvasProps {
  scrollContainer: React.RefObject<HTMLElement>
}

/**
 * SpaceWarpCanvas component creates a space warp effect with prominent stars and colorful shooting stars.
 * It uses a sophisticated color palette to enhance the visual appeal.
 */
const SpaceWarpCanvas: React.FC<SpaceWarpCanvasProps> = ({ scrollContainer }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let stars: Star[] = []
    let shootingStars: ShootingStar[] = []

    // Sophisticated color palette
    const colorPalette = [
      '#1A237E', // Deep Indigo
      '#4A148C', // Deep Purple
      '#880E4F', // Deep Pink
      '#1B5E20', // Deep Green
      '#006064', // Deep Cyan
    ]

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initElements()
    }

    const getRandomColor = () => {
      return colorPalette[Math.floor(Math.random() * colorPalette.length)]
    }

    const initElements = () => {
      stars = []
      shootingStars = []

      // Initialize stars
      for (let i = 0; i < 1000; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * canvas.width,
          r: Math.random() * 2 + 1, // Increased star size
          color: getRandomColor()
        })
      }

      // Initialize shooting stars (all inactive initially)
      for (let i = 0; i < 3; i++) { // Reduced number of shooting stars from 5 to 3
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 80 + 40, // Slightly reduced length
          speed: Math.random() * 6 + 3, // Slightly reduced speed
          angle: Math.random() * Math.PI * 2,
          opacity: 1,
          active: false,
          color: getRandomColor()
        })
      }
    }

    const moveElements = (speed: number) => {
      stars.forEach(star => {
        star.z -= speed
        if (star.z <= 0) {
          star.z = canvas.width
        }
      })

      shootingStars.forEach(star => {
        if (star.active) {
          star.x += Math.cos(star.angle) * star.speed
          star.y += Math.sin(star.angle) * star.speed
          star.opacity -= 0.015 // Slightly faster fade out
          if (star.opacity <= 0 || star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
            star.active = false
          }
        } else if (Math.random() < 0.003) { // Reduced chance to activate a shooting star
          star.x = Math.random() * canvas.width
          star.y = Math.random() * canvas.height
          star.angle = Math.random() * Math.PI * 2
          star.opacity = 1
          star.active = true
          star.color = getRandomColor() // New color for each activation
        }
      })
    }

    const drawElements = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)

      // Draw stars
      stars.forEach(star => {
        const x = star.x / (star.z * 0.001)
        const y = star.y / (star.z * 0.001)
        const r = star.r * (1 - star.z / canvas.width)

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r * 2)
        gradient.addColorStop(0, star.color)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.beginPath()
        ctx.arc(x, y, r * 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw shooting stars
      shootingStars.forEach(star => {
        if (star.active) {
          ctx.beginPath()
          ctx.moveTo(star.x - canvas.width / 2, star.y - canvas.height / 2)
          ctx.lineTo(
            star.x - canvas.width / 2 - Math.cos(star.angle) * star.length,
            star.y - canvas.height / 2 - Math.sin(star.angle) * star.length
          )
          ctx.strokeStyle = `${star.color}${Math.floor(star.opacity * 255).toString(16).padStart(2, '0')}`
          ctx.lineWidth = 2 // Slightly reduced line width
          ctx.stroke()
        }
      })

      ctx.restore()
    }

    const animate = (time: number) => {
      const scrollY = scrollContainer.current?.scrollTop || 0
      const speed = 5 + scrollY * 0.05 // Increase speed based on scroll position
      moveElements(speed)
      drawElements()

      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    animate(0)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [scrollContainer])

  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
  )
}

export default SpaceWarpCanvas