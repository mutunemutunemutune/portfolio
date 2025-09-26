import React, { useState, useMemo } from 'react';
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

const ProjectsShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock projects data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with advanced features like real-time inventory management, payment processing, and analytics dashboard.",
      fullDescription: `A comprehensive e-commerce platform built with modern web technologies. This project showcases advanced full-stack development skills including real-time features, payment integration, and scalable architecture.\n\nThe platform handles thousands of products with complex filtering, search functionality, and personalized recommendations. Built with performance and user experience as top priorities.`,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      category: "Web Application",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redis", "AWS"],
      status: "Live",
      featured: true,
      duration: "6 months",
      demoUrl: "https://demo-ecommerce.example.com",
      githubUrl: "https://github.com/username/ecommerce-platform",
      caseStudyUrl: "https://portfolio.example.com/case-study/ecommerce",
      features: [
        "Real-time inventory management",
        "Advanced product filtering and search",
        "Secure payment processing with Stripe",
        "Admin dashboard with analytics",
        "Mobile-responsive design"
      ],
      stats: {
        users: "10K+",
        orders: "5K+",
        uptime: "99.9%",
        performance: "A+"
      }
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking.",
      fullDescription: `A powerful task management application designed for modern teams. Features real-time collaboration, advanced project tracking, and intuitive user interface.\n\nBuilt with scalability in mind, supporting teams of all sizes with features like time tracking, file attachments, and detailed reporting.`,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      category: "Web Application",
      technologies: ["React", "TypeScript", "Socket.io", "PostgreSQL", "Docker"],
      status: "Live",
      featured: false,
      duration: "4 months",
      demoUrl: "https://demo-taskmanager.example.com",
      githubUrl: "https://github.com/username/task-manager",
      features: [
        "Real-time collaboration",
        "Drag-and-drop task management",
        "Team chat integration",
        "Time tracking and reporting",
        "File attachments and comments",
        "Custom project templates"
      ],
      stats: {
        teams: "500+",
        tasks: "50K+",
        uptime: "99.8%",
        satisfaction: "4.8/5"
      }
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A beautiful weather application with interactive maps, detailed forecasts, and location-based weather alerts.",
      fullDescription: `An elegant weather dashboard that provides comprehensive weather information with stunning visualizations. Features include interactive weather maps, detailed forecasts, and personalized weather alerts.\n\nThe application uses multiple weather APIs to provide accurate and up-to-date information with a focus on user experience and visual appeal.`,
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
      category: "Web Application",
      technologies: ["React", "D3.js", "Weather API", "Mapbox", "PWA"],
      status: "Live",
      featured: true,
      duration: "3 months",
      demoUrl: "https://demo-weather.example.com",
      githubUrl: "https://github.com/username/weather-dashboard",
      features: [
        "Interactive weather maps",
        "7-day detailed forecasts",
        "Location-based alerts",
        "Historical weather data",
        "Offline functionality (PWA)",
        "Customizable dashboard widgets"
      ],
      stats: {
        locations: "1M+",
        users: "25K+",
        accuracy: "95%",
        updates: "Real-time"
      }
    },
    {
      id: 4,
      title: "Mobile Banking App",
      description: "A secure mobile banking application with biometric authentication, transaction management, and financial insights.",
      fullDescription: `A comprehensive mobile banking solution built with React Native. Features advanced security measures, intuitive user interface, and comprehensive financial management tools.\n\nThe app includes biometric authentication, real-time transaction monitoring, and AI-powered financial insights to help users manage their finances effectively.`,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      category: "Mobile Application",
      technologies: ["React Native", "Node.js", "JWT", "Biometrics", "Chart.js"],
      status: "In Progress",
      featured: false,
      duration: "8 months",
      githubUrl: "https://github.com/username/mobile-banking",
      features: [
        "Biometric authentication",
        "Real-time transaction monitoring",
        "Budget tracking and insights",
        "Bill payment integration",
        "Card management",
        "Financial goal setting"
      ],
      stats: {
        transactions: "100K+",
        security: "Bank-grade",
        rating: "4.9/5",
        downloads: "50K+"
      }
    },
    {
      id: 5,
      title: "Social Media API",
      description: "A RESTful API for social media applications with advanced features like real-time messaging, content moderation, and analytics.",
      fullDescription: `A robust and scalable RESTful API designed for social media applications. Built with modern backend technologies and follows industry best practices for security, performance, and scalability.\n\nThe API supports millions of users with features like real-time messaging, content moderation, and comprehensive analytics dashboard.`,
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&h=600&fit=crop",
      category: "Backend API",
      technologies: ["Node.js", "Express", "MongoDB", "Redis", "WebSocket", "JWT"],
      status: "Live",
      featured: true,
      duration: "5 months",
      githubUrl: "https://github.com/username/social-media-api",
      caseStudyUrl: "https://portfolio.example.com/case-study/social-api",
      features: [
        "RESTful API design",
        "Real-time messaging",
        "Content moderation system",
        "Advanced user authentication",
        "Rate limiting and security",
        "Comprehensive API documentation"
      ],
      stats: {
        endpoints: "150+",
        requests: "1M+/day",
        uptime: "99.9%",
        response: "<100ms"
      }
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "A modern portfolio website with 3D animations, interactive elements, and optimized performance.",
  fullDescription: `A cutting-edge portfolio website showcasing modern web development techniques. Features 3D animations, interactive elements, and optimized performance for an engaging user experience.\n\nBuilt with the latest web technologies and design trends, this portfolio demonstrates advanced frontend development skills and attention to detail.`,
      category: "UI/UX Design",
      status: "Live",
      featured: false,
      duration: "2 months",
      demoUrl: "https://portfolio.example.com",
      githubUrl: "https://github.com/username/portfolio-3d",
      features: [
        "3D animations and interactions",
        "Responsive design",
        "Performance optimized",
        "SEO friendly",
        "Dark/light theme toggle",
        "Contact form integration"
      ],
      stats: {
        performance: "100/100",
        accessibility: "100/100",
        seo: "100/100",
        loadTime: "<2s"
      }
    }
  ];

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    // Apply category filter
    if (activeFilter !== 'all') {
      const filterMap = {
        'web': 'Web Application',
        'mobile': 'Mobile Application',
        'api': 'Backend API',
        'ui-ux': 'UI/UX Design'
      };
      filtered = filtered?.filter(project => project?.category === filterMap?.[activeFilter]);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(project =>
        project?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        project?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        project?.technologies?.some(tech => tech?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'popular':
        filtered = [...filtered]?.sort((a, b) => (b?.featured ? 1 : 0) - (a?.featured ? 1 : 0));
        break;
      case 'alphabetical':
        filtered = [...filtered]?.sort((a, b) => a?.title?.localeCompare(b?.title));
        break;
      case 'recent':
      default:
        filtered = [...filtered]?.sort((a, b) => b?.id - a?.id);
        break;
    }

    return filtered;
  }, [activeFilter, searchQuery, sortBy]);

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

        {/* Project Grid */}
        <ProjectGrid
          projects={filteredAndSortedProjects}
          onViewDetails={handleViewDetails}
          onViewDemo={handleViewDemo}
          isLoading={isLoading}
        />

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
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-muted-foreground mb-4 md:mb-0">
              © {new Date()?.getFullYear()} Portfolio Pro. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Icon name="Github" size={20} />
              </a>
              <a
                href="https://linkedin.com/in/username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Icon name="Linkedin" size={20} />
              </a>
              <a
                href="https://twitter.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Icon name="Twitter" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ProjectsShowcase;