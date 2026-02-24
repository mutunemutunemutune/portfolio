
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

const NotFound = lazy(() => import("pages/NotFound"));
const AboutSection = lazy(() => import("./pages/about-section"));
const SkillsDisplay = lazy(() => import("./pages/skills-display"));
const ContactFormPage = lazy(() => import("./pages/contact-form"));
const ProjectsShowcase = lazy(() => import("./pages/projects-showcase"));
const PortfolioHome = lazy(() => import("./pages/portfolio-home"));
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const ProjectEditor = lazy(() => import("./pages/admin/ProjectEditor"));
const AdminGuard = lazy(() => import("./components/AdminGuard"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));


const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto" /></div>}>
          <RouterRoutes>
            <Route path="/" element={<PortfolioHome />} />
            <Route path="/about-section" element={<AboutSection />} />
            <Route path="/skills-display" element={<SkillsDisplay />} />
            <Route path="/contact-form" element={<ContactFormPage />} />
            <Route path="/projects-showcase" element={<ProjectsShowcase />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminGuard><ProjectEditor /></AdminGuard>} />
            <Route path="/admin/dashboard" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
            <Route path="/portfolio-home" element={<PortfolioHome />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
