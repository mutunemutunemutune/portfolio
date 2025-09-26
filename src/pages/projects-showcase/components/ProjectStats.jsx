import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProjectStats = ({ projects }) => {
  const stats = [
    {
      id: 'total',
      label: 'Total Projects',
      value: projects?.length,
      icon: 'FolderOpen',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'live',
      label: 'Live Projects',
      value: projects?.filter(p => p?.status === 'Live')?.length,
      icon: 'Globe',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'inProgress',
      label: 'In Progress',
      value: projects?.filter(p => p?.status === 'In Progress')?.length,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'technologies',
      label: 'Technologies',
      value: [...new Set(projects.flatMap(p => p.technologies))]?.length,
      icon: 'Code',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats?.map((stat, index) => (
        <motion.div
          key={stat?.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
        >
          <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${stat?.bgColor} flex items-center justify-center`}>
            <Icon name={stat?.icon} size={24} className={stat?.color} />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
          <div className="text-sm text-muted-foreground">{stat?.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectStats;