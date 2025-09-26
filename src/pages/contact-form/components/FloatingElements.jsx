import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  const floatingShapes = [
    {
      id: 1,
      size: 'w-4 h-4',
      position: 'top-20 left-10',
      delay: 0,
      duration: 6
    },
    {
      id: 2,
      size: 'w-6 h-6',
      position: 'top-40 right-20',
      delay: 1,
      duration: 8
    },
    {
      id: 3,
      size: 'w-3 h-3',
      position: 'top-60 left-1/4',
      delay: 2,
      duration: 7
    },
    {
      id: 4,
      size: 'w-5 h-5',
      position: 'bottom-40 right-10',
      delay: 0.5,
      duration: 9
    },
    {
      id: 5,
      size: 'w-4 h-4',
      position: 'bottom-20 left-20',
      delay: 1.5,
      duration: 6
    },
    {
      id: 6,
      size: 'w-2 h-2',
      position: 'top-32 right-1/3',
      delay: 2.5,
      duration: 5
    }
  ];

  const floatingLines = [
    {
      id: 1,
      width: 'w-16',
      position: 'top-24 left-1/3',
      rotation: 45,
      delay: 1,
      duration: 10
    },
    {
      id: 2,
      width: 'w-12',
      position: 'bottom-32 right-1/4',
      rotation: -30,
      delay: 2,
      duration: 8
    },
    {
      id: 3,
      width: 'w-20',
      position: 'top-1/2 left-16',
      rotation: 60,
      delay: 0,
      duration: 12
    }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating Circles */}
      {floatingShapes?.map((shape) => (
        <motion.div
          key={shape?.id}
          className={`absolute ${shape?.size} ${shape?.position} rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-sm`}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: shape?.duration,
            delay: shape?.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      {/* Floating Lines */}
      {floatingLines?.map((line) => (
        <motion.div
          key={line?.id}
          className={`absolute ${line?.width} h-0.5 ${line?.position} bg-gradient-to-r from-transparent via-primary/30 to-transparent`}
          style={{ rotate: `${line?.rotation}deg` }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.2, 0.5, 0.2],
            scaleX: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: line?.duration,
            delay: line?.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full bg-gradient-to-r from-secondary/10 to-accent/10 blur-2xl"
        animate={{
          scale: [1.2, 0.8, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 6,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Particle Trail */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full"
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default FloatingElements;