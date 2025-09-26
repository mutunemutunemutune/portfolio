import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box } from '@react-three/drei';
import { motion } from 'framer-motion';


const FloatingSkill = ({ skill, position, rotationSpeed = 1 }) => {
  const meshRef = useRef();
  const textRef = useRef();

  useFrame((state) => {
    if (meshRef?.current) {
      meshRef.current.rotation.x += 0.01 * rotationSpeed;
      meshRef.current.rotation.y += 0.01 * rotationSpeed;
      meshRef.current.position.y = position?.[1] + Math.sin(state?.clock?.elapsedTime + position?.[0]) * 0.2;
    }
    if (textRef?.current) {
      textRef?.current?.lookAt(state?.camera?.position);
    }
  });

  const getSkillColor = (name) => {
    const colors = {
      'HTML': '#E34F26',
      'CSS': '#1572B6',
      'JavaScript': '#F7DF1E',
      'React': '#61DAFB',
      'Node.js': '#339933',
      'Python': '#3776AB',
      'MongoDB': '#47A248',
      'Express': '#000000',
      'Git': '#F05032',
      'Docker': '#2496ED',
      'AWS': '#FF9900',
      'TypeScript': '#3178C6'
    };
    return colors?.[name] || '#00F5FF';
  };

  return (
    <group position={position}>
      <Box ref={meshRef} args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color={getSkillColor(skill?.name)} />
      </Box>
      <Text
        ref={textRef}
        position={[0, -1.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill?.name}
      </Text>
      <Text
        position={[0, -2, 0]}
        fontSize={0.2}
        color="#A1A1AA"
        anchorX="center"
        anchorY="middle"
      >
        {skill?.level}
      </Text>
    </group>
  );
};

const Skill3DIcon = ({ skills, activeCategory }) => {
  const filteredSkills = skills?.filter(skill => skill?.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full h-96 md:h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-background to-card"
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F5FF" />
        
        {filteredSkills?.map((skill, index) => {
          const angle = (index / filteredSkills?.length) * Math.PI * 2;
          const radius = 3;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = (Math.random() - 0.5) * 2;
          
          return (
            <FloatingSkill
              key={skill?.id}
              skill={skill}
              position={[x, y, z]}
              rotationSpeed={0.5 + Math.random() * 0.5}
            />
          );
        })}
      </Canvas>
    </motion.div>
  );
};

export default Skill3DIcon;