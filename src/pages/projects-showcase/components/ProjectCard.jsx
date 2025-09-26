import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProjectCard = ({ project, onViewDetails, onViewDemo }) => {
  return (
    <motion.div
      className="bg-card border border-border rounded-xl overflow-hidden group cursor-pointer"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0, 245, 255, 0.15)"
      }}
      transition={{ duration: 0.3 }}
      onClick={() => onViewDetails(project)}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project?.image}
          alt={project?.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Status Badge */}
        {project?.status && (
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              project?.status === 'Live' ?'bg-success text-success-foreground' 
                : project?.status === 'In Progress' ?'bg-warning text-warning-foreground' :'bg-secondary text-secondary-foreground'
            }`}>
              {project?.status}
            </span>
          </div>
        )}
      </div>
      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {project?.title}
          </h3>
          <div className="flex items-center gap-2 ml-4">
            {project?.featured && (
              <Icon name="Star" size={16} className="text-warning fill-current" />
            )}
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {project?.description}
        </p>

        {/* Technology Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project?.technologies?.slice(0, 4)?.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
          {project?.technologies?.length > 4 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium">
              +{project?.technologies?.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={(e) => {
              e?.stopPropagation();
              onViewDetails(project);
            }}
            className="flex-1"
          >
            View Details
          </Button>
          {project?.demoUrl && (
            <Button
              variant="default"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
              onClick={(e) => {
                e?.stopPropagation();
                onViewDemo(project);
              }}
              className="flex-1"
            >
              Live Demo
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;