import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const InteractiveElements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Show elements after initial load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Mouse tracking for interactive cursor
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const skills = [
    { name: 'React', icon: 'Code', color: '#61DAFB', position: { top: '20%', left: '15%' } },
    { name: 'Node.js', icon: 'Server', color: '#339933', position: { top: '30%', right: '20%' } },
    { name: 'TypeScript', icon: 'FileCode', color: '#3178C6', position: { bottom: '35%', left: '10%' } },
    { name: 'GraphQL', icon: 'Database', color: '#E10098', position: { top: '60%', right: '15%' } },
    { name: 'AWS', icon: 'Cloud', color: '#FF9900', position: { bottom: '20%', right: '25%' } },
    { name: 'Docker', icon: 'Box', color: '#2496ED', position: { bottom: '50%', left: '85%' } },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-4 h-4 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorPosition.x - 8,
          top: cursorPosition.y - 8,
        }}
        animate={{
          scale: activeSkill ? 1.5 : 1,
          opacity: activeSkill ? 0.8 : 0.3,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Floating Skill Orbs */}
      <AnimatePresence>
        {isVisible && skills?.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="absolute pointer-events-auto"
            style={skill.position}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.2 }
            }}
            onHoverStart={() => setActiveSkill(skill.name)}
            onHoverEnd={() => setActiveSkill(null)}
          >
            <motion.div
              className="relative w-16 h-16 bg-card/20 backdrop-blur-medium border border-border rounded-full flex items-center justify-center cursor-pointer group"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Skill Icon */}
              <Icon 
                name={skill.icon} 
                size={24} 
                style={{ color: skill.color }}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ 
                  background: `radial-gradient(circle, ${skill.color}20, transparent 70%)`
                }}
              />
              
              {/* Tooltip */}
              <AnimatePresence>
                {activeSkill === skill.name && (
                  <motion.div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-card border border-border rounded-lg text-sm font-mono text-foreground whitespace-nowrap"
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {skill.name}
                    <div 
                      className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-card"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating Code Snippets */}
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              className="absolute top-1/4 left-20 pointer-events-none"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 0.6, x: 0 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <div className="bg-card/10 backdrop-blur-subtle border border-border rounded-lg p-4 font-mono text-sm text-text-secondary">
                <div className="text-primary">const</div>
                <div className="ml-2 text-secondary">developer</div>
                <div className="ml-4 text-accent">= "creative";</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-1/3 right-24 pointer-events-none"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 0.6, x: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <div className="bg-card/10 backdrop-blur-subtle border border-border rounded-lg p-4 font-mono text-sm text-text-secondary">
                <div className="text-success">function</div>
                <div className="ml-2 text-primary">buildAwesome() {'{'}</div>
                <div className="ml-4 text-warning">return</div>
                <div className="ml-6 text-accent">"magic";</div>
                <div>{'}'}</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Animated Lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <svg className="w-full h-full">
          <motion.path
            d="M100,200 Q400,100 700,300 T1200,200"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1.5 }}
          />
          <motion.path
            d="M200,500 Q600,400 900,600 T1400,500"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 2 }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F5FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#00F5FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
              <stop offset="50%" stopColor="#FF6B6B" stopOpacity="1" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Particle System */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
      >
        {Array.from({ length: 15 })?.map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -80, -20],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default InteractiveElements;