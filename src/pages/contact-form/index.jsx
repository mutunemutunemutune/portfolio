import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import FloatingElements from './components/FloatingElements';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import ScrollIndicator from '../portfolio-home/components/ScrollIndicator';

const ContactFormPage = () => {
  useEffect(() => {
    document.title = '3D Portfolio Pro - Contact';
  }, []);

  return (
    <section id="contact-form" className="min-h-screen bg-background relative overflow-hidden snap-start">
      <ScrollIndicator />
      <Navigation />
      <FloatingElements />
      {/* Main Content */}
      <div className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:py-12 ">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Let's Work{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Together
              </span>
            </h1>
            <p className="text-[16px] md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? I'm here to help you create exceptional digital experiences that make an impact.
            </p>
          </motion.div>

          {/* Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="order-2 lg:order-1">
              <ContactInfo />
            </div>

            {/* Contact Form */}
            <div className="order-1 lg:order-2">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 lg:p-10">
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-8 lg:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Why Work With Me?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3+</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Years Experience</h3>
                  <p className="text-gray-400 text-sm">
                    Proven track record in full-stack development and modern web technologies.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-secondary">50+</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Projects Completed</h3>
                  <p className="text-gray-400 text-sm">
                    Successfully delivered projects ranging from startups to enterprise solutions.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-accent">24h</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Response Time</h3>
                  <p className="text-gray-400 text-sm">
                    Quick communication and regular updates throughout the project lifecycle.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Footer */}
      
      <Footer />
  </section>
   
  );
};

export default ContactFormPage;