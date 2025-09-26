import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProfessionalStory = () => {
  const storyPoints = [
    {
      id: 1,
      year: "2019",
      title: "Started the Journey",
      description: "Began my coding journey with HTML, CSS, and JavaScript. Built my first website and fell in love with creating digital experiences.",
      icon: "Rocket"
    },
    {
      id: 2,
      year: "2020",
      title: "Frontend Mastery",
      description: "Mastered React.js and modern frontend frameworks. Started building complex single-page applications with responsive designs.",
      icon: "Monitor"
    },
    {
      id: 3,
      year: "2021",
      title: "Full Stack Evolution",
      description: "Expanded to backend development with Node.js and databases. Built complete web applications from concept to deployment.",
      icon: "Database"
    },
    {
      id: 4,
      year: "2023",
      title: "Leading Projects",
      description: "Now leading development teams and architecting scalable solutions. Passionate about mentoring and sharing knowledge.",
      icon: "Users"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          My <span className="text-primary">Journey</span>
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          From curious beginner to experienced developer, here's how I've grown and evolved in the world of technology.
        </p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="relative"
      >
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30" />

        {storyPoints?.map((point, index) => (
          <motion.div
            key={point?.id}
            variants={itemVariants}
            className="relative flex items-start space-x-6 mb-12 last:mb-0"
          >
            {/* Timeline dot */}
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg glow-primary"
            >
              <Icon name={point?.icon} size={24} className="text-white" />
            </motion.div>

            {/* Content */}
            <motion.div
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center space-x-3 mb-3">
                <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full">
                  {point?.year}
                </span>
                <h3 className="text-xl font-semibold text-white">
                  {point?.title}
                </h3>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {point?.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProfessionalStory;