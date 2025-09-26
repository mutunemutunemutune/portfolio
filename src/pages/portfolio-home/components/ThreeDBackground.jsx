import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = ({ count = 40 }) => {
  const particlesData = useMemo(() => {
    return Array.from({ length: count }, (_, index) => ({
      id: index,
      size: Math.random() * 8 + 4, // 4-12px
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: Math.random() * 20 + 10, // 10-30s
      delay: Math.random() * 5,
      color: `hsl(${180 + Math.random() * 80}, ${70 + Math.random() * 30}%, ${50 + Math.random() * 30}%)`,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particlesData.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-sm opacity-40"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.6, 0.3, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const GeometricElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main Circle */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-40 h-40 border-2 border-cyan-400 rounded-full opacity-30"
        style={{
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 40px rgba(0, 245, 255, 0.3)',
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Rotating Ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-56 h-56 border-4 border-purple-500 rounded-full opacity-50"
        style={{
          transform: 'translate(-50%, -50%)',
          borderStyle: 'dashed',
          boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)',
        }}
        animate={{
          rotate: [360, 0],
          y: [0, -20, 0],
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Floating Diamond */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-12 h-12 bg-red-400 opacity-40 transform rotate-45"
        style={{
          boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)',
        }}
        animate={{
          rotate: [45, 225, 405],
          x: [0, 30, -20, 0],
          y: [0, -25, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Triangle */}
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-0 h-0 opacity-45"
        style={{
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderBottom: '25px solid #10B981',
          filter: 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.4))',
        }}
        animate={{
          rotate: [0, 120, 240, 360],
          x: [0, -40, 20, 0],
          y: [0, 30, -15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

const PulsingOrbs = () => {
  const orbs = useMemo(() => {
    return Array.from({ length: 6 }, (_, index) => ({
      id: index,
      size: Math.random() * 40 + 20, // 20-60px
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 80 + 10, // 10-90%
      color: ['cyan', 'purple', 'pink', 'emerald', 'yellow', 'blue'][index],
      duration: Math.random() * 8 + 4, // 4-12s
    }));
  }, []);

  const colorMap = {
    cyan: 'bg-cyan-400/20 shadow-cyan-400/30',
    purple: 'bg-purple-400/20 shadow-purple-400/30',
    pink: 'bg-pink-400/20 shadow-pink-400/30',
    emerald: 'bg-emerald-400/20 shadow-emerald-400/30',
    yellow: 'bg-yellow-400/20 shadow-yellow-400/30',
    blue: 'bg-blue-400/20 shadow-blue-400/30',
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full blur-sm ${colorMap[orb.color]}`}
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            boxShadow: `0 0 ${orb.size}px currentColor`,
          }}
          animate={{
            scale: [1, 1.5, 0.8, 1],
            opacity: [0.2, 0.5, 0.3, 0.2],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const MouseInteraction = () => {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-8 h-8 bg-cyan-400 rounded-full opacity-10 pointer-events-none"
      style={{
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)',
      }}
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.5,
        opacity: 0.3,
      }}
    />
  );
};

const GradientOverlay = () => {
  return (
    <div className="absolute inset-0">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 60, -40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Utility to detect mobile device
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(window.navigator.userAgent);
};

const  ThreeDBackground = () => {
  const mobile = typeof window !== 'undefined' && isMobile();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-slate-950">
      {/* Gradient Background */}
      <GradientOverlay />

      {/* Pulsing Orbs */}
      <PulsingOrbs />

      {/* Floating Particles - reduce count on mobile */}
      <FloatingParticles count={mobile ? 15 : 40} />

      {/* Geometric Elements - skip on mobile for performance */}
      {!mobile && <GeometricElements />}

      {/* Mouse Interaction - skip on mobile */}
      {!mobile && <MouseInteraction />}

      {/* Extra dark overlay for more contrast, but keep animation visible */}
      <div className="absolute inset-0 bg-black/70 pointer-events-none z-10" />

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5 z-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

export default ThreeDBackground;