'use client'

import React, { useRef, useEffect } from 'react'

import SpacemanCanvas from "../spaceman/Spaceman"
import { useGLTF } from '@react-three/drei'
import SpaceWarpCanvas from './SpaceWarpCanvas'
interface HeroProps {
  scrollContainer: React.RefObject<HTMLElement>
}


const HeroTitle: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
     
      <h1 className="font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 text-[36px] xs:text-[46px] sm:text-[60px] md:text-[72px] lg:text-[90px] 2xl:text-[160px] leading-[100px] 2xl:leading-[140px] transition-all duration-300 cursor-default font-sans animate-pulse shadow-glow">
        Rishab Singh
      </h1>
    </div>
  );
}

function MyModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

const Hero: React.FC<HeroProps> = ({ scrollContainer }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slightly dulled background */}
      <div className="absolute inset-0 bg-gray-900 opacity-80"></div>
      
      {/* Space warp effect */}
      <SpaceWarpCanvas scrollContainer={scrollContainer} />
      
      {/* Content */}
      <div className='absolute top-[10%] sm:top-[16%] lg:top-[24%] w-full mx-auto z-10'>
        <div className="absolute left-8 sm:left-12 md:left-16 lg:left-24 xl:left-32 2xl:left-40">
          <HeroTitle />

          <div className="mt-8 transform scale-110">
            {/* Cyberpunk-style info box */}
            <div className="bg-black bg-opacity-70 border-2 border-neon-orange p-4 rounded-lg shadow-neon">
              <div className="text-neon-purple font-mono mb-2">
                <span className="text-neon-green">&gt;</span> WELCOME TO MY PORTFOLIO
              </div>
              <div className="streaky-glow text-neon-purple">
                <span className="text-emerald-400 font-sans">EDUCATION::</span> <span className="text-purple-400 glow-purple">MS CS @ NYU</span>, <span className="text-blue-400 glow-blue">Prev @ Intel Corp</span>
              </div>
              <div className="streaky-glow text-neon-orange">
                <span className="text-emerald-400 font-sans">SKILLS::</span> <span className="text-amber-300 font-mono">Data Engineering, Data Science, Software Development, AI/ML</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Animated Spaceman component */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <div 
          className="relative w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[1000px]"
          style={{
            animation: 'floatIn 1.5s ease-out forwards, floatInPlace 4s ease-in-out infinite',
            transform: 'translateY(-40px) scale(1.2)'
          }}
        >
          <SpacemanCanvas scrollContainer={scrollContainer} />
        </div>
      </div>
    </section>
  )
}

export default Hero;
