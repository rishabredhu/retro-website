import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import * as THREE from 'three'
import { ShaderMaterial } from 'three'
import { useSpring, animated } from '@react-spring/three'

extend({ ShaderMaterial })

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform sampler2D uTexture;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;

  #define DELTA 2.0
  
  float noise(vec2 p) {
    return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 texel = 1.0 / uResolution;
    vec2 uv = vUv;

    float a = texture2D(uTexture, uv).r;
    float b = texture2D(uTexture, uv).g;

    float reaction = a * b - a - 0.047;
    float diffusion_a = a * (1.0 - a);
    float diffusion_b = b * (1.0 - b);

    float da = 1.0 * diffusion_a - reaction + 0.037 * (1.0 - a);
    float db = 0.5 * diffusion_b + reaction - 0.037 * b;

    vec4 sum = vec4(0.0);
    for (float x = -DELTA; x <= DELTA; x += 1.0) {
      for (float y = -DELTA; y <= DELTA; y += 1.0) {
        sum += texture2D(uTexture, uv + vec2(x, y) * texel);
      }
    }

    vec4 color = sum / ((2.0 * DELTA + 1.0) * (2.0 * DELTA + 1.0));
    a = color.r + da * 0.1;
    b = color.g + db * 0.1;

    // Mouse interaction
    float distToMouse = distance(uv, uMouse);
    a += 0.1 * smoothstep(0.1, 0.0, distToMouse);
    b -= 0.1 * smoothstep(0.1, 0.0, distToMouse);

    // Color mixing
    vec3 finalColor = mix(uColor1, uColor2, a);
    finalColor = mix(finalColor, uColor3, b);

    // Add some noise and time-based variation
    finalColor += vec3(noise(uv * 1000.0 + uTime * 0.1)) * 0.05;
    finalColor += 0.1 * sin(uTime * 0.2 + uv.x * 10.0) * sin(uTime * 0.1 + uv.y * 10.0);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`

interface MousePosition {
  x: number;
  y: number;
}

interface Background3DProps {
  mouse: MousePosition;
}


const FluidSimulation: React.FC<{ mouse: MousePosition }> = ({ mouse }) => {

  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { gl, size } = useThree()

  const [renderTargets, uniforms] = useMemo(() => {
    const rtSettings = {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    }
    const targets = [
      new THREE.WebGLRenderTarget(size.width, size.height, rtSettings),
      new THREE.WebGLRenderTarget(size.width, size.height, rtSettings)
    ]
    return [
      targets,
      {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uTexture: { value: null },
        uColor1: { value: new THREE.Color('#ff3030') },
        uColor2: { value: new THREE.Color('#30ff30') },
        uColor3: { value: new THREE.Color('#3030ff') }
      }
    ]
  }, [size])

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Initialize with random noise
    const data = new Float32Array(size.width * size.height * 4)
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.random()
      data[i + 1] = Math.random()
      data[i + 2] = 0.5
      data[i + 3] = 1
    }
    const texture = new THREE.DataTexture(data, size.width, size.height, THREE.RGBAFormat, THREE.FloatType)
    texture.needsUpdate = true
    renderTargets[0].texture = texture
    renderTargets[1].texture = texture.clone()
  }, [size, renderTargets])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uTexture.value = renderTargets[currentIndex].texture
      materialRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y)

      gl.setRenderTarget(renderTargets[1 - currentIndex])
      gl.render(state.scene, state.camera)
      gl.setRenderTarget(null)

      setCurrentIndex(1 - currentIndex)
    }
  })

  // Animate color changes
  const { color1, color2, color3 } = useSpring({
    from: { color1: '#ff3030', color2: '#30ff30', color3: '#3030ff' },
    to: async (next) => {
      while (true) {
        await next({ color1: '#ff9900', color2: '#00ff99', color3: '#9900ff', delay: 2000 })
        await next({ color1: '#3030ff', color2: '#ff3030', color3: '#30ff30', delay: 2000 })
        await next({ color1: '#ff3030', color2: '#30ff30', color3: '#3030ff', delay: 2000 })
      }
    },
    config: { duration: 3000 },
  })

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColor1.value.set(color1.get())
      materialRef.current.uniforms.uColor2.value.set(color2.get())
      materialRef.current.uniforms.uColor3.value.set(color3.get())
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

const Background3D: React.FC = () => {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })

  const handleMouseMove = (event: React.MouseEvent) => {
    setMouse({
      x: event.clientX / window.innerWidth,
      y: 1 - event.clientY / window.innerHeight,
    })
  }

  return (
    <div className="fixed inset-0 -z-10" onMouseMove={handleMouseMove}>
      <Canvas>
        <FluidSimulation mouse={mouse} />
      </Canvas>
    </div>
  )
}

export default Background3D