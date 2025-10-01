import React from 'react';
import { motion } from 'framer-motion';

import Icon from './AppIcon';


const Footer = () => {
  const socialLinks = [
    { icon: 'Github', url: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: 'Linkedin', url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: 'Twitter', url: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: 'Mail', url: 'mailto:vqeeh1234@gmail.com', label: 'Email' },
  ];
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-background border-t border-border pt-10 pb-6 mt-12"
    >
      <div className="max-w-7xl  mx-auto px-4 sm:px-8 justify-between items-center">
        <div className="flex flex-wrap justify-between  md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg md:text-xl font-heading font-bold mb-2 text-foreground tracking-tight">About</h3>
            <p className="text-sm md:text-base text-muted-foreground font-normal leading-relaxed">
            
            </p>
          </div>
          {/* Quick Links */}
          <div>

            <ul className="flex gap-5 text-sm md:text-base font-normal">
              <li><a href="/" className="hover:text-primary transition-colors font-medium">Home</a></li>
              <li><a href="/about-section" className="hover:text-primary transition-colors font-medium">About</a></li>
              <li><a href="/projects-showcase" className="hover:text-primary transition-colors font-medium">Projects</a></li>
              <li><a href="/skills-display" className="hover:text-primary transition-colors font-medium">Skills</a></li>
              <li><a href="/contact-form" className="hover:text-primary transition-colors font-medium">Contact</a></li>
            </ul>
          </div>
          
          {/* Social Links */}
         
        </div>
        <div className="flex flex-cols-2 sm:flex-row items-center justify-between gap-4 border-t border-border pt-4 mt-4">
          <div className="text-xs md:text-sm text-muted-foreground font-mono tracking-tight text-center sm:text-left">
            &copy; {new Date().getFullYear()} Your Name. All rights reserved.
          </div>
          <div className="flex gap-4 mt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-2xl md:text-3xl"
                >
                  <Icon name={link.icon} size={18} />
                </a>
              ))}
            </div>

        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

