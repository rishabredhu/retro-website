"use client"
import React, { useRef, useEffect } from 'react'

/**
 * RetroGradientBackground Component
 * 
 * This component creates a retro-style gradient background with a subtle animation effect.
 * It's designed to give a nostalgic feel to the blog section.
 */
const SpectralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawGradient = (time: number) => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      
      // Retro color palette
      gradient.addColorStop(0, `hsl(${(time * 10) % 360}, 70%, 60%)`)
      gradient.addColorStop(0.3, `hsl(${((time * 10) + 60) % 360}, 70%, 50%)`)
      gradient.addColorStop(0.6, `hsl(${((time * 10) + 120) % 360}, 70%, 40%)`)
      gradient.addColorStop(1, `hsl(${((time * 10) + 180) % 360}, 70%, 30%)`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add a subtle grid pattern
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1
      const gridSize = 50
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    const animate = (time: number) => {
      drawGradient(time / 1000)
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animate(0)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
      style={{ mixBlendMode: 'multiply' }}
    />
  )
}

export default SpectralBackground