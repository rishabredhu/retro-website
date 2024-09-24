import React, { Suspense, useEffect, useRef, useState } from 'react';
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Group } from "three";
import CanvasLoader from "../loader/loader";
import spaceman from "../../assets/3d/ship_in_clouds.glb";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; 
import * as THREE from 'three';




// Import necessary components
// import StaticSpaceman from './path/to/StaticSpaceman';

interface SpacemanProps {
  scale: number[];
  position: number[];
  rotationX: number;
  rotationY: number;
}

const Spaceman = ({ scale, position, rotationX, rotationY }: SpacemanProps) => {
  const spacemanRef = useRef<any>();
  // Importing the .glb file using a different method
  const loader = new GLTFLoader();
  const [scene, setScene] = useState<THREE.Scene | null>(null); // Initialize state with correct type
  const [animations, setAnimations] = useState<THREE.AnimationClip[] | null>(null); // Update state type to allow AnimationClip[]

  useEffect(() => {
    loader.load(spaceman, (gltf) => {
      // Update the state to accept the correct type for scene
      setScene(gltf.scene as unknown as THREE.Scene); // Cast to unknown first to avoid type error
      setAnimations(gltf.animations); // Now this will match the state type
    });
    
  }, []);

  const { actions } = useAnimations(animations || [], spacemanRef); // Provide default empty array if animations is null

  useEffect(() => {
    console.log("Available animations: ", animations);
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
      <primitive object={scene || new THREE.Object3D()} /> // Fallback to a new Object3D if scene is null
    </group>
  );
};

interface SpacemanCanvasProps {
  scrollContainer: React.RefObject<HTMLElement>;
}

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

    const handleContextLost = (event: Event) => { // Specify the type of 'event'
      event.preventDefault();
      console.log('WebGL context lost');
      // Handle context loss (e.g., stop animations)
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
      // Reinitialize your WebGL context here
    };

    // Ensure 'canvas' is not null before adding event listeners
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost, false);
      canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
    }

    // Cleanup listeners on component unmount
    return () => {
      if (canvas) { // Check if canvas is not null
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      }
    };
  }, []); // Ensure this effect runs only once on mount

  return (
    <Canvas>
      <Suspense fallback={<CanvasLoader />}>
        
          <group rotation={[rotationX, rotationY, 0]}>
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