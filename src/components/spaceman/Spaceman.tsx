import React, { Suspense, useEffect, useRef, useState } from 'react';
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Group } from "three";
import CanvasLoader from "../loader/loader";
// import spaceman from "../../assets/3d/spaceman.glb";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; 
import * as THREE from 'three';
import { Scene } from 'three';

// Import necessary components
// import StaticSpaceman from './path/to/StaticSpaceman';

/**
 * Interface for Spaceman component props
 */
interface SpacemanProps {
  scale: number[];
  position: number[];
  rotationX: number;
  rotationY: number;
}

/**
 * Spaceman component for rendering a 3D spaceman model
 */
const Spaceman = ({ scale, position, rotationX, rotationY }: SpacemanProps) => {
  const spacemanRef = useRef<any>();
  const loader = new GLTFLoader();
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [animations, setAnimations] = useState<THREE.AnimationClip[] | null>(null);

  useEffect(() => {
    // Load the 3D model and animations
    loader.load(
      '/assets/3d/spaceman.glb', // Path to the 3D model file
      (gltf) => {
        // Success callback
        setScene(gltf.scene as unknown as THREE.Scene);
        setAnimations(gltf.animations);
      },
      undefined, // Progress callback (optional)
      (error) => {
        // Error callback
        console.error('An error occurred while loading the 3D model:', error);
      }
    );
  }, []); // Empty dependency array ensures this effect runs only once

  const { actions } = useAnimations(animations || [], spacemanRef);

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log("Available animations: ", animations);
    }
    if (actions && actions["Idle"]) {
      actions["Idle"].play();
    }
  }, [actions, animations]);

  return (
    <group 
      ref={spacemanRef} 
      position={[position[0], position[1], position[2]]} 
      scale={[scale[0], scale[1], scale[2]]} 
      rotation={[rotationX, rotationY + 2.2, 0]}
    >
      <primitive object={scene || new THREE.Object3D()} />
    </group>
  );
};

/**
 * Interface for SpacemanCanvas component props
 */
interface SpacemanCanvasProps {
  scrollContainer: React.RefObject<HTMLElement>;
}

/**
 * SpacemanModel component for loading and animating the spaceman model
 */
const SpacemanModel: React.FC = () => {
  const { scene, animations } = useGLTF('/assets/3d/spaceman.glb');
  const ref = useRef<any>();
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (actions['Idle']) {
      actions['Idle'].play();
    }
  }, [actions]);

  return <primitive ref={ref} object={scene} />;
};

/**
 * SpacemanCanvas component for rendering the 3D scene with the spaceman
 */
const SpacemanCanvas: React.FC<SpacemanCanvasProps> = ({ scrollContainer }) => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainer.current) {
        const scrollTop = scrollContainer.current.scrollTop;
        setRotationX(scrollTop * -0.006);
        setRotationY(scrollTop * -0.0075);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollContainer]);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = document.getElementById('yourCanvasId') as HTMLCanvasElement | null;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.error('WebGL context lost');
      // Handle context loss (e.g., stop animations)
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
      // Reinitialize your WebGL context here
    };

    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost, false);
      canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      }
    };
  }, []);

  return (
    <Canvas>
      <Suspense fallback={<CanvasLoader />}>
        <group rotation={[rotationX, rotationY, 1]} position={[0, 0, 0]}>
          <SpacemanModel />
        </group>
      </Suspense>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
    </Canvas>
  );
};

export default SpacemanCanvas;