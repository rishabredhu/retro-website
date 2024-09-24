// StarCanvas.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import StarBackground  from './stars'; 

const StarCanvas = () => {
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <Canvas>
        <StarBackground />
      </Canvas>
    </div>
  );
};

export default StarCanvas;
