import React, { useState, useEffect, Suspense } from 'react';
// Simple error boundary for 3D Canvas
class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // Optionally log error
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-96 bg-card rounded-xl flex flex-col items-center justify-center text-center p-6">
          <div className="text-2xl mb-2 text-warning">3D View Failed to Load</div>
          <div className="text-muted-foreground mb-4">There was a problem rendering the 3D skills view. This may be due to browser/device limitations or missing assets.</div>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            onClick={this.props.onSwitchToGrid}
          >
            Switch to Grid View
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
import { motion, AnimatePresence } from 'framer-motion';

import SkillsHeader from './components/SkillsHeader';
import Navigation from '../../components/Navigation';
import SkillCategory from './components/SkillCategory';
import Skill3DIcon from './components/Skill3DIcon';
import SkillsGrid from './components/SkillsGrid';
import Icon from '../../components/AppIcon';
import Footer from '../../components/Footer';
import ScrollIndicator from '../portfolio-home/components/ScrollIndicator';

const SkillsDisplay = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [viewMode, setViewMode] = useState('grid'); // '3d' or 'grid'
  const [isLoading, setIsLoading] = useState(true);

  const skillCategories = [
    { id: 'frontend', name: 'Frontend', icon: 'Monitor' },
    { id: 'backend', name: 'Backend', icon: 'Server' },
    { id: 'tools', name: 'Tools & DevOps', icon: 'Settings' },
    { id: 'database', name: 'Database', icon: 'Database' }
  ];

  const skills = [
    // Frontend Skills
    {
      id: 1,
      name: 'HTML',
      category: 'frontend',
      level: 'Expert',
      icon: 'FileText',
      description: `Semantic HTML5 markup with accessibility best practices.\nExperience with modern web standards and SEO optimization.`,
      experience: '3+ years'
    },
    {
      id: 2,
      name: 'CSS',
      category: 'frontend',
      level: 'Expert',
      icon: 'Palette',
      description: `Advanced CSS3 with Flexbox, Grid, and animations.\nExpertise in responsive design and CSS preprocessors.`,
      experience: '3+ years'
    },
    {
      id: 3,
      name: 'JavaScript',
      category: 'frontend',
      level: 'Expert',
      icon: 'Code',
      description: `Modern ES6+ JavaScript with async/await patterns.\nExperience with DOM manipulation and event handling.`,
      experience: '2+ years'
    },
    {
      id: 4,
      name: 'React',
      category: 'frontend',
      level: 'Expert',
      icon: 'Atom',
      description: `React 18 with hooks, context, and performance optimization.\nExperience with component architecture and state management.`,
      experience: '2+ years'
    },
    {
      id: 5,
      name: 'TypeScript',
      category: 'frontend',
      level: 'Advanced',
      icon: 'FileCode',
      description: `Type-safe JavaScript development with advanced types.\nExperience with interfaces, generics, and decorators.`,
      experience: '1+ years'
    },

    // Backend Skills
    {
      id: 6,
      name: 'Node.js',
      category: 'backend',
      level: 'Advanced',
      icon: 'Server',
      description: `Server-side JavaScript with Express.js framework.\nExperience with RESTful APIs and microservices architecture.`,
      experience: '1+ years'
    },
    {
      id: 7,
      name: 'Python',
      category: 'backend',
      level: 'Advanced',
      icon: 'Code2',
      description: `Python development with FastApi and Flask frameworks.\nExperience with data processing and AI intergration.`,
      experience: '1+ years'
    },
    {
      id: 8,
      name: 'Express',
      category: 'backend',
      level: 'Advanced',
      icon: 'Zap',
      description: `Fast, unopinionated web framework for Node.js.\nExperience with middleware, routing, and authentication.`,
      experience: '1+ years'
    },

    // Tools & DevOps
    {
      id: 9,
      name: 'Git',
      category: 'tools',
      level: 'Expert',
      icon: 'GitBranch',
      description: `Version control with Git and GitHub workflows.\nExperience with branching strategies and code reviews.`,
      experience: '2+ years'
    },
    {
      id: 10,
      name: 'Docker',
      category: 'tools',
      level: 'Intermediate',
      icon: 'Package',
      description: `Containerization with Docker and Docker Compose.\nExperience with multi-stage builds and orchestration.`,
      experience: '1+ years'
    },
    {
      id: 11,
      name: 'AWS',
      category: 'tools',
      level: 'Intermediate',
      icon: 'Cloud',
      description: `Cloud services including EC2, S3, and Lambda.\nExperience with serverless architecture and deployment.`,
      experience: '1+ years'
    },

    // Database
    {
      id: 12,
      name: 'MongoDB',
      category: 'database',
      level: 'Advanced',
      icon: 'Database',
      description: `NoSQL database design with MongoDB and Mongoose.\nExperience with aggregation pipelines and indexing.`,
      experience: '1+ years'
    },
    {
      id: 13,
      name: 'PostgreSQL',
      category: 'database',
      level: 'Intermediate',
      icon: 'HardDrive',
      description: `Relational database design with complex queries.\nExperience with migrations, triggers, and optimization.`,
      experience: '1+ years'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === '3d' ? 'grid' : '3d');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          
          className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto">
            
        
        </motion.div>
      </div>
    );
  }

  return (
    <section id="skills-display" className="min-h-screen bg-background text-foreground overflow-hidden snap-start">
      <ScrollIndicator />
      <Navigation />
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="container mx-auto px-4 md:py-20 py-10">
          <SkillsHeader />

          {/* Category Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:flex justify-center gap-4 mb-8"
          >
            {skillCategories?.map((category, index) => (
              <SkillCategory
                key={category?.id}
                category={category}
                isActive={activeCategory === category?.id}
                onClick={() => handleCategoryChange(category?.id)}
                index={index}
              />
            ))}
          </motion.div>

          {/* View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-card rounded-lg p-1 border border-border">
              <button
                onClick={toggleViewMode}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                  viewMode === '3d' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="Box" size={18} />
                <span className="text-sm font-medium">3D View</span>
              </button>
              <button
                onClick={toggleViewMode}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                  viewMode === 'grid' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="Grid3x3" size={18} />
                <span className="text-sm font-medium">Grid View</span>
              </button>
            </div>
          </motion.div>

          {/* Skills Display */}
          <AnimatePresence mode="wait">
            {viewMode === '3d' ? (
              <motion.div
                key="3d-view"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <CanvasErrorBoundary onSwitchToGrid={() => setViewMode('grid')}>
                  <Suspense fallback={
                      <div className="w-full h-96 bg-card rounded-xl flex items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto" />
                      </div>
                    }>
                    <Skill3DIcon skills={skills} activeCategory={activeCategory} />
                  </Suspense>
                </CanvasErrorBoundary>
              </motion.div>
            ) : (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <SkillsGrid skills={skills} activeCategory={activeCategory} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="bg-card rounded-xl p-8 border border-border max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Continuous Learning & Growth
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                My technical journey spans over 3 years of hands-on development experience.I believe in staying current with emerging technologies and best practices,constantly expanding my skill set to deliver innovative solutions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="Award" size={20} />
                  <span className="text-sm font-medium">3+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <Icon name="BookOpen" size={20} />
                  <span className="text-sm font-medium">Continuous Learning</span>
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <Icon name="Target" size={20} />
                  <span className="text-sm font-medium">Best Practices</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <Footer/>
      </div>
    </section>
  );
};

export default SkillsDisplay;