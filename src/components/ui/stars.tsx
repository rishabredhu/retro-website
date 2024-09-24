import React, { useRef, useState, useEffect } from 'react';
import { useFrame, extend, Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { Vector3 } from 'three';
import { ShaderMaterial } from 'three';
import { PointsMaterial } from 'three';

/**
 * Custom shader material for twinkling and brighter stars
 */
const StarMaterial = shaderMaterial(
  { time: 0, size: 1, color: new THREE.Color(0xffffff) },
  `
  varying float intensity;
  void main() {
    vec3 vNormal = normalize(normal);
    intensity = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  `
  uniform float time;
  uniform vec3 color;
  varying float intensity;
  void main() {
    float twinkle = sin(time + intensity * 10.0) * 0.5 + 0.5;
    vec3 brighterColor = color * 1.5; // Increase brightness by 50%
    gl_FragColor = vec4(brighterColor * twinkle, 1.0);
  }
  `
);

extend({ StarMaterial });

/**
 * StarBackground component
 * Renders a dynamic starry background with parallax and twinkling effects
 */
const StarBackground = () => {
  const starsRef = useRef<THREE.Points>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle mouse move to simulate parallax
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y -= 0.05; // Base rotation for natural feel

      // Parallax effect based on mouse position
      starsRef.current.rotation.x = mousePos.y * 0.1;
      starsRef.current.rotation.y = mousePos.x * 0.1;

      // Twinkling effect
      const material = starsRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = state.clock.elapsedTime;
      }

      // Pulsation effect (size variation)
      const scaleFactor = 1 + 0.03 * Math.sin(state.clock.elapsedTime * 2);
      starsRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  });

  return (
    <group>
      <points ref={starsRef} onClick={() => console.log('Shooting star!')}>
        <bufferGeometry />
        <Stars
          radius={1}
          depth={1}
          count={1}
          factor={8}
          fade
        />
        <pointsMaterial attach="material" size={12} color={0xffffff} /> {/* Increased size for brighter appearance */}
      </points>
      
      {/* Camera controls for interaction */}
      <OrbitControls />
    </group>
  )
}

export default StarBackground;