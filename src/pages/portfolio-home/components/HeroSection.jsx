
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

// Animation variants for framer-motion
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
      staggerChildren: 0.05,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const floatingVariants = {
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const navigate = useNavigate();

  // Use navigate for route navigation
  const goToSection = (route) => {
    navigate(route);
  };

  const nameText = "VICTOR NDERITU";
  const subtitleText = "FULL STACK DEVELOPER";

  return (
  <section id="portfolio-home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-2 sm:px-4">
      {/* ...existing code... */}
      {/* Main Content Container */}
      <motion.div
        className="relative py-20 z-10 text-center px-2 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Name Display */}
        <motion.div variants={titleVariants} className="mb-4 sm:mb-6">
          <div className="relative">
            <h1
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-heading mb-2 break-words bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-300% text-transparent"
              style={{
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'var(--tw-gradient-from, #0ea5e9)', // fallback solid color
              }}
            >
              <span className="block sm:hidden text-primary" style={{ WebkitTextFillColor: 'unset', color: 'var(--tw-gradient-from, #0ea5e9)' }}>
                {nameText}
              </span>
              <span className="hidden sm:inline">
                {nameText?.split('')?.map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </span>
            </h1>
            
            {/* Glowing underline */}
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-primary to-secondary rounded-full glow-primary-intense"
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 1.5, delay: 1.5 }}
            />
          </div>
        </motion.div>

        {/* Animated Subtitle */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold text-text-secondary font-mono tracking-wider break-words">
            {subtitleText?.split('')?.map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                variants={letterVariants}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        {/* Enhanced Tagline with Typewriter Effect */}
  <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
          <div className="relative max-w-4xl mx-auto">
            <motion.p
              className="text-lg md:text-xl lg:text-3xl text-text-secondary leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Crafting immersive digital experiences with cutting-edge technology.
            </motion.p>
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-text-secondary/80 leading-relaxed font-light mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Transforming ideas into scalable, beautiful web applications.
            </motion.p>
          </div>
        </motion.div>

        {/* Enhanced CTA Buttons */}
  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10 sm:mb-20 w-full max-w-xs sm:max-w-none mx-auto">
          <motion.button
            onClick={() => goToSection('/projects-showcase')}
            className="group relative px-10 py-5 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-lg rounded-2xl transition-all duration-500 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button Background Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-secondary to-primary"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            <span className="relative z-10 flex items-center space-x-3">
              <span>VIEW MY WORK</span>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Icon name="ArrowRight" size={24} />
              </motion.div>
            </span>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl glow-primary-intense opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          <motion.button
            onClick={() => goToSection('/contact-form')}
            className="group relative px-10 py-5 border-3 border-primary text-primary font-bold text-lg rounded-2xl bg-transparent backdrop-blur-medium transition-all duration-500 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Hover Background */}
            <motion.div
              className="absolute inset-0 bg-primary"
              initial={{ y: '100%' }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.span 
              className="relative z-10 flex items-center space-x-3 group-hover:text-gray-200 transition-colors duration-300"
            >
              <Icon name="Mail" size={24} />
              <span>GET IN TOUCH</span>
            </motion.span>
          </motion.button>
        </motion.div>

    
  

        {/* Enhanced Scroll Indicator */}
        <motion.div
            initial={{ opacity: 0, y: 1 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 5 }}
            className="absolute bottom-4 sm:bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <button
              onClick={() => goToSection('/about-section')}
              className="group flex flex-col items-center space-y-3 text-text-secondary hover:text-primary transition-colors duration-500"
            >
              <span className="text-sm font-mono tracking-wider uppercase opacity-70 group-hover:opacity-100">
                Scroll to explore
              </span>
            
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative p-3 border-2 border-border rounded-full group-hover:border-primary transition-colors duration-500 bg-card/20 backdrop-blur-medium"
              >
                <Icon name="ChevronDown" size={24} />
              
                {/* Ripple Effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-primary rounded-full"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </button>
          </motion.div>
      </motion.div>
      {/* Enhanced Background Effects */}
      <motion.div
        className="absolute top-10 left-4 w-2 h-2 bg-primary rounded-full opacity-60 hidden xs:block"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="absolute top-24 right-8 w-1 h-1 bg-secondary rounded-full opacity-40 hidden sm:block"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-16 left-1/4 w-3 h-3 bg-accent rounded-full opacity-50 hidden md:block"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 2 }}
      />
    </section>
  );
};

export default HeroSection;