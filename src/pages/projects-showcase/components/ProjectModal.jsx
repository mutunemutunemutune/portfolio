import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          
          {/* Modal Content */}
          <motion.div
            className="relative bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors duration-200"
            >
              <Icon name="X" size={20} className="text-foreground" />
            </button>

            {/* Project Image */}
            <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
              <Image
                src={project?.image}
                alt={project?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Status Badge */}
              {project?.status && (
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project?.status === 'Live' ?'bg-success text-success-foreground' 
                      : project?.status === 'In Progress' ?'bg-warning text-warning-foreground' :'bg-secondary text-secondary-foreground'
                  }`}>
                    {project?.status}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {project?.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {project?.category} • {project?.duration}
                  </p>
                </div>
                {project?.featured && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-warning/20 text-warning rounded-full">
                    <Icon name="Star" size={16} className="fill-current" />
                    <span className="text-sm font-medium">Featured</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">About This Project</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project?.fullDescription}
                </p>
              </div>

              {/* Key Features */}
              {project?.features && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {project?.features?.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Icon name="Check" size={16} className="text-success mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project?.technologies?.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Stats */}
              {project?.stats && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Project Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(project?.stats)?.map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-xl font-bold text-primary">{value}</div>
                        <div className="text-sm text-muted-foreground capitalize">{key?.replace(/([A-Z])/g, ' $1')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {project?.demoUrl && (
                  <Button
                    variant="default"
                    iconName="ExternalLink"
                    iconPosition="right"
                    onClick={() => window.open(project?.demoUrl, '_blank')}
                    className="flex-1"
                  >
                    View Live Demo
                  </Button>
                )}
                {project?.githubUrl && (
                  <Button
                    variant="outline"
                    iconName="Github"
                    iconPosition="left"
                    onClick={() => window.open(project?.githubUrl, '_blank')}
                    className="flex-1"
                  >
                    View Code
                  </Button>
                )}
                {project?.caseStudyUrl && (
                  <Button
                    variant="secondary"
                    iconName="FileText"
                    iconPosition="left"
                    onClick={() => window.open(project?.caseStudyUrl, '_blank')}
                    className="flex-1"
                  >
                    Case Study
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;