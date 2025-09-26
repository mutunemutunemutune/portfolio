import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillCard = ({ skill, index, onHover, isHovered }) => {
  const getProficiencyColor = (level) => {
    switch (level) {
      case 'Expert':
        return 'text-primary';
      case 'Advanced':
        return 'text-secondary';
      case 'Intermediate':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getProficiencyWidth = (level) => {
    switch (level) {
      case 'Expert':
        return '90%';
      case 'Advanced':
        return '75%';
      case 'Intermediate':
        return '60%';
      default:
        return '40%';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onHoverStart={() => onHover(skill?.id)}
      onHoverEnd={() => onHover(null)}
      className={`bg-card rounded-xl p-6 border border-border transition-all duration-300 cursor-pointer ${
        isHovered ? 'glow-primary border-primary/50' : 'hover:border-primary/30'
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name={skill?.icon} size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{skill?.name}</h3>
          <p className={`text-sm font-medium ${getProficiencyColor(skill?.level)}`}>
            {skill?.level}
          </p>
        </div>
      </div>
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
        {skill?.description}
      </p>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Proficiency</span>
          <span className="text-xs text-foreground">{skill?.level}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: getProficiencyWidth(skill?.level) }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
          />
        </div>
      </div>
      {skill?.experience && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            <Icon name="Clock" size={12} className="inline mr-1" />
            {skill?.experience} experience
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default SkillCard;