import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedAvatar from './components/AnimatedAvatar';
import FloatingCards from './components/FloatingCards';
import ProfessionalStory from './components/ProfessionalStory';
import PersonalInsights from './components/PersonalInsights';
import Navigation from '../../components/Navigation';
import ScrollIndicator from '../portfolio-home/components/ScrollIndicator';
import Footer from '../../components/Footer';

const AboutSection = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);



  return (
    <section id="about-section" className="min-h-screen bg-background text-foreground overflow-hidden snap-start">
      <ScrollIndicator />
      {/* Navigation */}
      <Navigation />
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY, opacity }}
        className="fixed inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </motion.div>
      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold uppercase tracking-wider"
                >
                  About Me
                </motion.span>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                >
                  Crafting Digital
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                    Experiences
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-xl text-gray-300 leading-relaxed max-w-2xl"
                >
                  I'm a passionate Full Stack Developer who transforms ideas into elegant, functional, and user-centered digital solutions. With 5+ years of experience, I specialize in creating immersive web experiences that blend cutting-edge technology with intuitive design.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-wrap gap-4"
              >
                <div className="px-6 py-3 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full">
                  <span className="text-primary font-semibold">React & Next.js Expert</span>
                </div>
                <div className="px-6 py-3 bg-gradient-to-r from-secondary/20 to-secondary/10 border border-secondary/30 rounded-full">
                  <span className="text-secondary font-semibold">3D Web Specialist</span>
                </div>
                <div className="px-6 py-3 bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-full">
                  <span className="text-accent font-semibold">UI/UX Enthusiast</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - 3D Avatar */}
            <div className="flex justify-center lg:justify-end">
              <AnimatedAvatar />
            </div>
          </div>
        </section>

        {/* Floating Cards Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                What I <span className="text-primary">Bring</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                A unique blend of technical expertise, creative vision, and user-focused approach to every project.
              </p>
            </motion.div>
            
            <FloatingCards />
          </div>
        </section>

        {/* Professional Story Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent to-card/20">
          <div className="max-w-6xl mx-auto">
            <ProfessionalStory />
          </div>
        </section>

        {/* Personal Insights Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <PersonalInsights />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Build Something <span className="text-primary">Amazing</span>?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Let's collaborate and bring your vision to life with cutting-edge technology and creative solutions.
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <button
                  onClick={() => window.location.href = '/contact-form'}
                  className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-background font-semibold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
                >
                  Let's Work Together
                </button>
              </motion.div>
            </div>
          </motion.div>
          
      </section>
        
      </div>
      <Footer/>
    </section>
  );
}
export default AboutSection;