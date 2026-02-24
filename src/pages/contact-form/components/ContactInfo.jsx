import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ContactInfo = () => {
  const contactMethods = [
    {
      id: 1,
      icon: "Mail",
      label: "Email",
      value: "vqeeh1234@gmail.com",
      href: "mailto:vqeeh1234@gmail.com"
    },
    {
      id: 2,
      icon: "Linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/victor-ndiritu",
      href: "https://www.linkedin.com/in/victor-ndiritu-130908204/"
    },
    {
      id: 3,
      icon: "Github",
      label: "GitHub",
      value: "github.com/victormutune",
      href: "https://github.com/victormutune"
    },
    {
      id: 4,
      icon: "MapPin",
      label: "Location",
      value: "Nairobi, Kenya",
      href: null
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          Ready to bring your next project to life? Let's discuss how we can work together to create something amazing.
        </p>
      </div>
      <div className="space-y-6 ">
        {contactMethods?.map((method, index) => (
          <motion.div
            key={method?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="group"
          >
            {method?.href ? (
              <a
                href={method?.href}
                target={method?.href?.startsWith('http') ? '_blank' : '_self'}
                rel={method?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center space-x-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:bg-gray-900/70 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon 
                    name={method?.icon} 
                    size={20} 
                    className="text-primary group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <div>
                  <p className="text-white font-medium">{method?.label}</p>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {method?.value}
                  </p>
                </div>
              </a>
            ) : (
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={method?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-white font-medium">{method?.label}</p>
                  <p className="text-gray-400 text-sm">{method?.value}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
      >
        <div className="flex items-center space-x-3 mb-3 ">
          <Icon name="Clock" size={20} className="text-primary" />
          <h3 className="text-white font-semibold">Response Time</h3>
        </div>
        <p className="text-gray-400 text-sm">
          I typically respond to messages within 24 hours. For urgent inquiries, feel free to reach out via LinkedIn.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;