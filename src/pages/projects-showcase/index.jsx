import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectFilters from './components/ProjectFilters';
import ProjectGrid from './components/ProjectGrid';
import ProjectModal from './components/ProjectModal';
import ProjectStats from './components/ProjectStats';
import Navigation from '../../components/Navigation';
import ScrollIndicator from '../portfolio-home/components/ScrollIndicator';
import Footer from '../../components/Footer';
import { supabase } from '../../utils/supabaseClient';        

const ProjectsShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Supabase projects state
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) {
        console.error('Error fetching projects:', error);
        setError(error);
      } else {
        console.log('Fetched projects:', data);
        setProjects(data || []);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  // Filter and sort projects - FIXED: Added projects to dependencies
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects || [];

    // Apply category filter
    if (activeFilter !== 'all') {
      const filterMap = {
        'web': 'Web Application',
        'mobile': 'Mobile Application',
        'api': 'Backend API',
        'ui-ux': 'UI/UX Design'
      };
      filtered = filtered.filter(project => project?.category === filterMap[activeFilter]);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        project?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        project?.technologies?.some(tech => tech?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'popular':
        filtered = [...filtered].sort((a, b) => (b?.featured ? 1 : 0) - (a?.featured ? 1 : 0));
        break;
      case 'alphabetical':
        filtered = [...filtered].sort((a, b) => a?.title?.localeCompare(b?.title));
        break;
      case 'recent':
      default:
        filtered = [...filtered].sort((a, b) => b?.id - a?.id);
        break;
    }

    return filtered;
  }, [projects, activeFilter, searchQuery, sortBy]); // Added projects here

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleViewDemo = (project) => {
    if (project?.demoUrl) {
      window.open(project?.demoUrl, '_blank');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Show loading state
  if (loading) {
    return (
      <section id="projects-showcase" className="min-h-screen bg-background text-foreground overflow-hidden snap-start">
        <ScrollIndicator />
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading projects...</p>
          </div>
        </div>
        <Footer />
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section id="projects-showcase" className="min-h-screen bg-background text-foreground overflow-hidden snap-start">
        <ScrollIndicator />
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <Icon name="AlertCircle" size={48} className="mx-auto" />
            </div>
            <p className="text-xl font-semibold text-foreground">Error loading projects</p>
            <p className="mt-2 text-muted-foreground">{error.message}</p>
            <Button 
              variant="default" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
        <Footer />
      </section>
    );
  }

  return (
    <section id="projects-showcase" className="min-h-screen bg-background text-foreground overflow-hidden snap-start">
      <ScrollIndicator />
      {/* Navigation */}
       <Navigation/>  
      {/* Main Content */}
      <main className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My <span className="text-primary">Projects</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore my portfolio of web applications, mobile apps, and backend systems. 
            Each project showcases different aspects of modern development.
          </p>
        </motion.div>

        {/* Project Statistics */}
        <ProjectStats projects={projects} />

        {/* Filters */}
        <ProjectFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <p className="text-muted-foreground">
            Showing {filteredAndSortedProjects?.length} of {projects?.length} projects
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </motion.div>

        {/* No Projects Found */}
        {filteredAndSortedProjects?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-muted-foreground mb-4">
              <Icon name="Search" size={48} className="mx-auto opacity-50" />
            </div>
            <p className="text-xl font-semibold text-foreground">No projects found</p>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your filters or search query
            </p>
            {(activeFilter !== 'all' || searchQuery) && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            )}
          </motion.div>
        )}

        {/* Project Grid */}
        {filteredAndSortedProjects?.length > 0 && (
          <ProjectGrid
            projects={filteredAndSortedProjects}
            onViewDetails={handleViewDetails}
            onViewDemo={handleViewDemo}
            isLoading={loading}
          />
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 py-12 bg-card border border-border rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Interested in Working Together?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and exciting projects. Let's create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              iconName="Mail"
              iconPosition="left"
              asChild
            >
              <Link to="/contact-form">Get In Touch</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Download"
              iconPosition="left"
              onClick={() => window.open('/resume.pdf', '_blank')}
            >
              Download Resume
            </Button>
          </div>
        </motion.div>
      </main>
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      {/* Footer */}
      <Footer/>
      
    </section>
  );
};

export default ProjectsShowcase;