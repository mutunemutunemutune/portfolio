import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const SectionAnchorMenu = () => {
  const [activeSection, setActiveSection] = useState('portfolio-home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', anchor: '#portfolio-home', section: 'portfolio-home' },
    { label: 'About', anchor: '#about-section', section: 'about-section' },
    { label: 'Projects', anchor: '#projects-showcase', section: 'projects-showcase' },
    { label: 'Skills', anchor: '#skills-display', section: 'skills-display' },
    { label: 'Contact', anchor: '#contact-form', section: 'contact-form' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems?.map(item => item?.section);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections?.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections?.[i]);
        if (element && element?.offsetTop <= scrollPosition) {
          setActiveSection(sections?.[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (anchor, section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    
    const element = document.querySelector(anchor);
    if (element) {
      element?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-100 bg-background/80 backdrop-blur-medium border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm font-mono">3D</span>
                </div>
                <span className="text-xl font-semibold font-heading text-foreground">
                  Portfolio Pro
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navigationItems?.map((item) => (
                  <button
                    key={item?.section}
                    onClick={() => handleNavClick(item?.anchor, item?.section)}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ease-smooth hover:text-primary ${
                      activeSection === item?.section
                        ? 'text-primary' :'text-text-secondary hover:text-foreground'
                    }`}
                  >
                    {item?.label}
                    {activeSection === item?.section && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary glow-primary animate-scale-in" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-surface transition-all duration-150 ease-smooth"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <Icon 
                  name={isMobileMenuOpen ? "X" : "Menu"} 
                  size={24} 
                  className="transition-transform duration-300 ease-smooth"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-150 md:hidden">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-strong"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bg-card border-b border-border animate-slide-down">
            <div className="px-6 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.section}
                  onClick={() => handleNavClick(item?.anchor, item?.section)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-150 ease-smooth ${
                    activeSection === item?.section
                      ? 'text-primary bg-primary/10 border border-primary/20' :'text-text-secondary hover:text-foreground hover:bg-surface'
                  }`}
                >
                  {item?.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SectionAnchorMenu;