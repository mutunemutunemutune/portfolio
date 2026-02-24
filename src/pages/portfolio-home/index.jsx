import React from 'react';
import HeroSection from './components/HeroSection';
import Navigation from '../../components/Navigation';
import ScrollIndicator from './components/ScrollIndicator';
import PersonalInsights from 'pages/about-section/components/PersonalInsights';
import Footer from '../../components/Footer';
import Icon from '../../components/AppIcon';


const PortfolioHome = () => {
  return (
  <div className="relative min-h-screen bg-gradient-to-b from-background via-card to-background scroll-smooth">
    <Navigation />
    <ScrollIndicator />
    <section id="portfolio-home" className="min-h-[80vh] flex flex-col items-center justify-center py-0 w-full max-w-7xl mx-auto">
      <HeroSection />

      {/* Personal Insights Preview (short) */}
      <section className="mt-12 w-full max-w-7xl px-4 mx-auto">
        <PersonalInsights />
      </section>

           {/* Project Features Section */}
      <section className="w-full max-w-6xl mx-auto mt-8 mb-12 px-2 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-center mb-8 text-foreground">Project Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-card/80 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-border hover:shadow-2xl transition-all duration-300">
            <span className="text-primary mb-2"><Icon name="Zap" size={36} /></span>
            <h3 className="text-lg font-bold mb-2">Real-Time Functionality</h3>
            <p className="text-sm md:text-base text-muted-foreground">Live chat, notifications, and dashboards for instant user feedback and collaboration.</p>
          </div>
          <div className="bg-card/80 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-border hover:shadow-2xl transition-all duration-300">
            <span className="text-secondary mb-2"><Icon name="Smartphone" size={36} /></span>
            <h3 className="text-lg font-bold mb-2">Mobile Responsive</h3>
            <p className="text-sm md:text-base  text-muted-foreground">All projects are fully responsive and optimized for every device and screen size.</p>
          </div>
          <div className="bg-card/80 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-border hover:shadow-2xl transition-all duration-300">
            <span className="text-accent mb-2"><Icon name="Lock" size={36} /></span>
            <h3 className="text-lg font-bold mb-2">Secure & Scalable</h3>
            <p className="text-sm md:text-base text-muted-foreground">Built with best practices for security and scalability, ready for real-world use.</p>
          </div>
          <div className="bg-card/80 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-border hover:shadow-2xl transition-all duration-300">
            <span className="text-success mb-2"><Icon name="Rocket" size={36} /></span>
            <h3 className="text-lg font-bold mb-2">Performance Optimized</h3>
            <p className="text-sm md:text-base  text-muted-foreground">Fast load times and smooth interactions using modern frameworks and techniques.</p>
          </div>
          <div className="bg-card/80 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-border hover:shadow-2xl transition-all duration-300">
            <span className="text-warning mb-2"><Icon name="Settings" size={36} /></span>
            <h3 className="text-lg font-bold mb-2">Custom Integrations</h3>
            <p className="text-sm md:text-base  text-muted-foreground">APIs, third-party services, and custom features tailored to each project’s needs.</p>
          </div>
          <div className="bg-card/80 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-border hover:shadow-2xl transition-all duration-300">
            <span className="text-info mb-2"><Icon name="Users" size={36} /></span>
            <h3 className="text-lg font-bold mb-2">User-Centered Design</h3>
            <p className="text-sm md:text-base text-muted-foreground">Every project is designed for a great user experience and accessibility.</p>
          </div>
        </div>
      </section>

       {/* Achievements Preview Section */}
      <section className="w-full max-w-4xl mx-auto mt-16 mb-8 px-2 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-center mb-8 text-foreground">Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-400/30 via-success/40 to-green-700/20 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-success">
            <span className="text-success mb-2"><Icon name="Trophy" size={32} /></span>
            <h3 className="text-lg font-bold mb-2">Awarded “Best Developer”</h3>
            <p className="text-sm md:text-base  text-muted-foreground">Recognized for outstanding project delivery and innovation in 2024.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-400/30 via-primary/40 to-blue-700/20 rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-primary">
            <span className="text-primary mb-2"><Icon name="BadgeCheck" size={32} /></span>
            <h3 className="text-lg font-bold mb-2">Certified Full Stack Engineer</h3>
            <p className="text-sm md:text-base  text-muted-foreground">Completed advanced certification in full stack web development.</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <a href="/about-section" className="text-primary font-semibold hover:underline">See all achievements</a>
        </div>
      </section>
    </section>
    <Footer/>
    </div>
  );
};

export default PortfolioHome;