import React, { useState, useEffect } from 'react';

const ScrollProgressIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { id: 'portfolio-home', label: 'Home' },
    { id: 'about-section', label: 'About' },
    { id: 'projects-showcase', label: 'Projects' },
    { id: 'skills-display', label: 'Skills' },
    { id: 'contact-form', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement?.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Determine active section
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = sections?.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections?.[i]?.id);
        if (element && element?.offsetTop <= scrollPosition) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial values

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (sectionId, index) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(index);
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-90 hidden lg:block">
      <div className="flex flex-col items-center space-y-4">
        {/* Progress Bar */}
        <div className="relative w-1 h-32 bg-border rounded-full overflow-hidden">
          <div 
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary to-secondary transition-all duration-300 ease-smooth glow-primary"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>

        {/* Section Indicators */}
        <div className="flex flex-col items-center space-y-3">
          {sections?.map((section, index) => (
            <button
              key={section?.id}
              onClick={() => handleSectionClick(section?.id, index)}
              className="group relative flex items-center"
              title={section?.label}
            >
              <div 
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ease-smooth ${
                  activeSection === index
                    ? 'bg-primary border-primary glow-primary scale-125' :'bg-transparent border-text-secondary hover:border-primary hover:scale-110'
                }`}
              />
              
              {/* Tooltip */}
              <div className="absolute right-6 px-3 py-1 bg-card border border-border rounded-lg text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-smooth whitespace-nowrap backdrop-blur-medium">
                {section?.label}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-card border-l border-b border-border rotate-45" />
              </div>
            </button>
          ))}
        </div>

        {/* Scroll Percentage */}
        <div className="mt-4 px-2 py-1 bg-card/80 backdrop-blur-medium border border-border rounded-lg">
          <span className="text-xs font-mono text-text-secondary">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScrollProgressIndicator;