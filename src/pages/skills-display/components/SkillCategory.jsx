import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillCategory = ({ category, isActive, onClick, index }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
        isActive
          ? 'bg-primary text-primary-foreground glow-primary'
          : 'bg-card text-muted-foreground hover:bg-primary/20 hover:text-primary'
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon name={category?.icon} size={20} />
        <span>{category?.name}</span>
      </div>
    </motion.button>
  );
};

export default SkillCategory;