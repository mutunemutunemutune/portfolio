import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import { motion } from 'framer-motion';

const FloatingGeometry = ({ position, color, shape = 'sphere' }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef?.current) {
      meshRef.current.rotation.x = Math.sin(state?.clock?.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.y = state?.clock?.elapsedTime * 0.2;
      meshRef.current.position.y = position?.[1] + Math.sin(state?.clock?.elapsedTime * 0.8) * 0.2;
    }
  });

  const renderShape = () => {
    switch (shape) {
      case 'box':
        return <Box ref={meshRef} position={position} args={[0.8, 0.8, 0.8]}>
          <meshStandardMaterial color={color} />
        </Box>;
      case 'torus':
        return <Torus ref={meshRef} position={position} args={[0.5, 0.2, 8, 16]}>
          <meshStandardMaterial color={color} />
        </Torus>;
      default:
        return <Sphere ref={meshRef} position={position} args={[0.6]}>
          <meshStandardMaterial color={color} />
        </Sphere>;
    }
  };

  return renderShape();
};

const AnimatedAvatar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="w-full h-96 relative"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F5FF" />
        
        <FloatingGeometry position={[0, 0, 0]} color="#00F5FF" shape="sphere" />
        <FloatingGeometry position={[2, 1, -1]} color="#8B5CF6" shape="box" />
        <FloatingGeometry position={[-2, -1, 1]} color="#FF6B6B" shape="torus" />
        <FloatingGeometry position={[1, -2, 0]} color="#10B981" shape="sphere" />
        <FloatingGeometry position={[-1.5, 1.5, -2]} color="#F59E0B" shape="box" />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default AnimatedAvatar;