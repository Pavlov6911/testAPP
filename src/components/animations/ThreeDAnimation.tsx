import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeDAnimationProps {
  className?: string;
  variant?: 'floating' | 'spinning' | 'distort';
  color?: string;
  wireframe?: boolean;
  modelPath?: string;
  autoRotate?: boolean;
}

const FloatingShape = ({ color = '#F97316', wireframe = false, variant = 'floating' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    if (variant === 'spinning') {
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.5;
    } else if (variant === 'floating') {
      meshRef.current.position.y = Math.sin(time) * 0.3;
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.2;
    }
    // For 'distort' variant, the MeshDistortMaterial handles the animation
  });
  
  const getGeometry = () => {
    switch (variant) {
      case 'spinning':
        return <torusKnotGeometry args={[1, 0.3, 128, 32]} />;
      case 'distort':
        return <sphereGeometry args={[1.2, 64, 64]} />;
      case 'floating':
      default:
        return <dodecahedronGeometry args={[1.2, 0]} />;
    }
  };
  
  return (
    <mesh ref={meshRef}>
      {getGeometry()}
      {variant === 'distort' ? (
        <MeshDistortMaterial 
          color={color}
          attach="material"
          distort={0.5}
          speed={3}
          roughness={0.1}
          wireframe={wireframe}
          transparent
          opacity={0.9}
        />
      ) : (
        <meshStandardMaterial 
          color={color} 
          wireframe={wireframe}
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={0.85}
          metalness={0.3}
          roughness={0.2}
        />
      )}
    </mesh>
  );
};

interface ModelLoaderProps {
  modelPath: string;
  color?: string;
}

const ModelLoader: React.FC<ModelLoaderProps> = ({ modelPath, color = '#F97316' }) => {
  const gltf = useGLTF(modelPath);
  const scene = gltf.scene;
  const modelRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!modelRef.current) return;
    const time = state.clock.getElapsedTime();
    modelRef.current.rotation.y = time * 0.2;
  });
  
  // Clone the scene to avoid modifying the cached original
  const clonedScene = scene.clone();
  
  // Apply material to all meshes in the scene
  clonedScene.traverse((node: THREE.Object3D) => {
    if (node instanceof THREE.Mesh) {
      node.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.5,
        metalness: 0.8,
      });
    }
  });
  
  return <primitive ref={modelRef} object={clonedScene} scale={1} />;
};

// Check if we're in a browser environment to avoid SSR issues
const isBrowser = typeof window !== 'undefined';

const ThreeDAnimation: React.FC<ThreeDAnimationProps> = ({
  className = '',
  variant = 'floating',
  color = '#F97316',
  wireframe = false,
  modelPath,
  autoRotate = true,
}) => {
  // Skip rendering in non-browser environments
  if (!isBrowser) return null;
  
  // Get the scene content
  const SceneContent: React.FC<{ color: string; wireframe: boolean; variant: 'floating' | 'spinning' | 'distort' }> = ({ color, wireframe, variant }) => (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Float speed={4} rotationIntensity={0.2} floatIntensity={2} enabled={variant === 'floating'}>
        {modelPath ? (
          <ModelLoader modelPath={modelPath} color={color} />
        ) : (
          <FloatingShape color={color} wireframe={wireframe} variant={variant} />
        )}
      </Float>
      
      <OrbitControls enableZoom={false} autoRotate={autoRotate} autoRotateSpeed={1} />
      <Environment preset="city" />
    </>
  );

  return (
    <div className={`w-full h-full ${className}`}>
      {isBrowser && (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#F97316" />
          <spotLight position={[0, 10, 0]} intensity={1} angle={0.3} penumbra={1} color="#3B82F6" />
          <Environment preset="city" />
          {autoRotate && <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />}
          <Float speed={2} rotationIntensity={1.5} floatIntensity={3}>
            <SceneContent color={color} wireframe={wireframe} variant={variant} />
          </Float>
        </Canvas>
      )}
    </div>
  );
};

export default ThreeDAnimation;