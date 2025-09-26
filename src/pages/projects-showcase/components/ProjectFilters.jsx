import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProjectFilters = ({ 
  activeFilter, 
  onFilterChange, 
  sortBy, 
  onSortChange, 
  searchQuery, 
  onSearchChange 
}) => {
  const filters = [
    { id: 'all', label: 'All Projects', count: null },
    { id: 'web', label: 'Web Apps', count: 8 },
    { id: 'mobile', label: 'Mobile Apps', count: 4 },
    { id: 'api', label: 'APIs', count: 6 },
    { id: 'ui-ux', label: 'UI/UX', count: 3 }
  ];

  const sortOptions = [
    { id: 'recent', label: 'Most Recent', icon: 'Calendar' },
    { id: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { id: 'alphabetical', label: 'A-Z', icon: 'ArrowUpDown' }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filters?.map((filter) => (
            <motion.button
              key={filter?.id}
              onClick={() => onFilterChange(filter?.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === filter?.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter?.label}
              {filter?.count && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === filter?.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-background text-muted-foreground'
                }`}>
                  {filter?.count}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
          <div className="flex-wrap md:flex gap-1">
            {sortOptions?.map((option) => (
              <Button
                key={option?.id}
                variant={sortBy === option?.id ? 'default' : 'ghost'}
                size="sm"
                iconName={option?.icon}
                iconPosition="left"
                onClick={() => onSortChange(option?.id)}
                className="whitespace-nowrap"
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      {(activeFilter !== 'all' || searchQuery) && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilter !== 'all' && (
            <span className="px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded text-xs font-medium">
              {filters?.find(f => f?.id === activeFilter)?.label}
              <button
                onClick={() => onFilterChange('all')}
                className="ml-2 hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="px-2 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded text-xs font-medium">
              "{searchQuery}"
              <button
                onClick={() => onSearchChange('')}
                className="ml-2 hover:text-secondary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectFilters;