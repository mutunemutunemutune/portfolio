import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillsHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-11 h-11 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center"
        >
          <Icon name="Code2" size={24} className="text-background" />
        </motion.div>
        <h1 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Technical Skills
        </h1>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-[15px] md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
      >
        Explore my technical expertise through interactive 3D visualizations.Discover the technologies and tools I use to build innovative solutions.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="grid grid-col-1 gap-2 md:flex items-center justify-center md:gap-6 mt-8"
      >
        <div className="flex items-center gap-2 text-primary">
          <Icon name="Zap" size={20} />
          <span className="text-sm font-medium">Interactive 3D</span>
        </div>
        <div className="w-px h-6 bg-border"></div>
        <div className="flex items-center gap-2 text-secondary">
          <Icon name="Layers" size={20} />
          <span className="text-sm font-medium">Multiple Categories</span>
        </div>
        <div className="w-px h-6 bg-border"></div>
        <div className="flex items-center gap-2 text-accent">
          <Icon name="TrendingUp" size={20} />
          <span className="text-sm font-medium">Proficiency Levels</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillsHeader;