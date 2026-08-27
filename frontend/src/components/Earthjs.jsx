import { useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Sphere, Stars } from '@react-three/drei'
import * as THREE from 'three'

function EarthMesh() {
  const earthRef = useRef()

  const texture = useLoader(
    THREE.TextureLoader,
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
  )

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0025
    }
  })

  return (
    <Sphere ref={earthRef} args={[1.50, 64, 64]}>
      <meshStandardMaterial
        map={texture}
        metalness={0.1}
        roughness={0.7}
      />
    </Sphere>
  )
}

function Atmosphere() {
  return (
    <Sphere args={[1.51, 64, 64]}>
      <meshBasicMaterial
        color="#4fc3f7"
        transparent
        opacity={0.08}
        side={THREE.BackSide}
      />
    </Sphere>
  )
}

function Moon() {
  const moonRef = useRef()

  useFrame((state) => {
    if (!moonRef.current) return

    const t = state.clock.elapsedTime * 0.35

    // Full circular orbit around Earth
    moonRef.current.position.x = Math.cos(t) * 2.2
    moonRef.current.position.z = Math.sin(t) * 2.2
    moonRef.current.position.y = Math.sin(t) * 0.25

    // Moon self-rotation
    moonRef.current.rotation.y += 0.02
  })

  return (
    <Sphere ref={moonRef} args={[0.28, 32, 32]}>
      <meshStandardMaterial
        color="#cfcfcf"
        roughness={0.95}
        metalness={0.1}
      />
    </Sphere>
  )
}

export default function Earthmotion() {
  return (
    <div className="w-full h-[340px] md:h-[400px] overflow-hidden bg-transparent">
      <Canvas
        camera={{ position: [0, 0.4, 5.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 3, 5]} intensity={1.4} />
        <pointLight position={[-4, -2, -3]} intensity={0.3} color="#90caf9" />

        <Stars
          radius={50}
          depth={30}
          count={820}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />

        <EarthMesh />
        <Atmosphere />
        <Moon />
      </Canvas>
    </div>
  )
}