import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const PersonalInsights = () => {
  const insights = [
    {
      id: 1,
      category: "Philosophy",
      title: "Code is Poetry",
      content: `I believe that writing code is an art form. Every function, every component, and every line should be crafted with intention and elegance.\n\nClean, readable code isn't just about functionality—it's about creating something beautiful that others can understand and build upon.`,
      icon: "BookOpen",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      id: 2,
      category: "Approach",
      title: "User-First Mindset",
      content: `Every project starts with understanding the user's needs and pain points. I don't just build features—I solve problems.\n\nWhether it's optimizing load times, improving accessibility, or creating intuitive interfaces, the user experience always comes first in my development process.`,
      icon: "Heart",
      gradient: "from-accent/20 to-accent/5"
    },
    {
      id: 3,
      category: "Growth",
      title: "Continuous Learning",
      content: `Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, tools, and methodologies to stay at the forefront of development.\n\nFrom attending tech conferences to contributing to open-source projects, learning is a lifelong journey that keeps me passionate about what I do.`,
      icon: "TrendingUp",
      gradient: "from-secondary/20 to-secondary/5"
    }
  ];

  const stats = [
    { label: "Years of Experience", value: "5+", icon: "Calendar" },
    { label: "Projects Completed", value: "50+", icon: "CheckCircle" },
    { label: "Technologies Mastered", value: "20+", icon: "Code" },
    { label: "Happy Clients", value: "30+", icon: "Smile" }
  ];

  return (
    <div className="space-y-16">
      {/* Personal Insights */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          What Drives <span className="text-primary">Me</span>
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Beyond the code and technologies, here are the principles and values that guide my work and career.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {insights?.map((insight, index) => (
          <motion.div
            key={insight?.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className={`h-full p-8 rounded-2xl bg-gradient-to-br ${insight?.gradient} border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300`}>
              <div className="flex items-center space-x-3 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center"
                >
                  <Icon name={insight?.icon} size={24} className="text-white" />
                </motion.div>
                <div>
                  <span className="text-primary text-sm font-semibold uppercase tracking-wider">
                    {insight?.category}
                  </span>
                  <h3 className="text-xl font-semibold text-white">
                    {insight?.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {insight?.content}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats?.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300"
              >
                <Icon name={stat?.icon} size={28} className="text-primary" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                className="text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300"
              >
                {stat?.value}
              </motion.div>
              
              <p className="text-gray-400 text-sm font-medium">
                {stat?.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PersonalInsights;