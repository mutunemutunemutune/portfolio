import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FloatingCards = () => {
  const cards = [
    {
      id: 1,
      title: "Full Stack Developer",
      description: "5+ years of experience building scalable web applications with modern technologies",
      icon: "Code2",
      color: "from-primary/20 to-primary/5",
      delay: 0.2
    },
    {
      id: 2,
      title: "UI/UX Enthusiast",
      description: "Passionate about creating intuitive and beautiful user experiences",
      icon: "Palette",
      color: "from-secondary/20 to-secondary/5",
      delay: 0.4
    },
    {
      id: 3,
      title: "Problem Solver",
      description: "Love tackling complex challenges and finding elegant solutions",
      icon: "Lightbulb",
      color: "from-accent/20 to-accent/5",
      delay: 0.6
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards?.map((card) => (
        <motion.div
          key={card?.id}
          initial={{ opacity: 0, y: 50, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: card?.delay,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            y: -10, 
            rotateX: 5,
            transition: { duration: 0.3 }
          }}
          className="group relative"
          style={{ perspective: "1000px" }}
        >
          <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${card?.color} border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300`}>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-4"
            >
              <Icon name={card?.icon} size={24} className="text-white" />
            </motion.div>
            
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300">
              {card?.title}
            </h3>
            
            <p className="text-gray-300 text-sm md:text-base  leading-relaxed">
              {card?.description}
            </p>
            
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCards;