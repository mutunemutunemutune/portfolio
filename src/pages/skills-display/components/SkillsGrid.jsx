import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillCard from './SkillCard';

const SkillsGrid = ({ skills, activeCategory }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const filteredSkills = skills?.filter(skill => skill?.category === activeCategory);

  return (
    <div className="mt-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="wait">
          {filteredSkills?.map((skill, index) => (
            <SkillCard
              key={`${activeCategory}-${skill?.id}`}
              skill={skill}
              index={index}
              onHover={setHoveredSkill}
              isHovered={hoveredSkill === skill?.id}
            />
          ))}
        </AnimatePresence>
      </motion.div>
      {filteredSkills?.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground">No skills found in this category.</p>
        </motion.div>
      )}
    </div>
  );
};

export default SkillsGrid;