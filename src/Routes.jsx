import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AboutSection from './pages/about-section';
import SkillsDisplay from './pages/skills-display';
import ContactFormPage from './pages/contact-form';
import ProjectsShowcase from './pages/projects-showcase';
import PortfolioHome from './pages/portfolio-home';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/about-section" element={<AboutSection />} />
        <Route path="/skills-display" element={<SkillsDisplay />} />
        <Route path="/contact-form" element={<ContactFormPage />} />
        <Route path="/projects-showcase" element={<ProjectsShowcase />} />
        <Route path="/portfolio-home" element={<PortfolioHome />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
