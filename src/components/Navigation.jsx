
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from './AppIcon';
import MobileMenuOverlay from './ui/MobileMenuOverlay';


const Navigation = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigationItems = [
    { path: '/', label: 'Home', icon: 'Home' },
    { path: '/about-section', label: 'About', icon: 'User' },
    { path: '/projects-showcase', label: 'Projects', icon: 'FolderOpen' },
    { path: '/skills-display', label: 'Skills', icon: 'Code2' },
    { path: '/contact-form', label: 'Contact', icon: 'Mail' }
  ];

  // Responsive: show hamburger on mobile, full nav on md+
  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:block fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="bg-card/80 backdrop-blur-medium border border-border rounded-full px-6 py-3">
          <div className="flex items-center gap-6">
            {navigationItems?.map((item) => {
              const isActive = location?.pathname === item?.path;
              return (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-primary-foreground glow-primary'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span className="text-sm font-medium">{item?.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-2 left-4 z-50 bg-card/80 border border-border rounded-full p-2 shadow-lg flex items-center justify-center"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
      >
        <Icon name="Menu" size={24} />
      </button>

      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
};

export default Navigation;