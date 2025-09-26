import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeaturedProjectsCarousel = ({ projects }) => {
  const featured = projects.filter(p => p.featured);
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % featured.length);
  const prev = () => setCurrent((current - 1 + featured.length) % featured.length);

  if (!featured.length) return null;

  return (
    <div className="w-full max-w-3xl mx-auto my-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primary">Featured Projects</h2>
        <div className="flex gap-2">
          <button onClick={prev} className="p-2 rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground transition-colors">&#8592;</button>
          <button onClick={next} className="p-2 rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground transition-colors">&#8594;</button>
        </div>
      </div>
      <div className="relative h-80 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={featured[current].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full flex flex-col md:flex-row bg-card border border-border rounded-xl overflow-hidden shadow-lg"
          >
            <img src={featured[current].image} alt={featured[current].title} className="w-full md:w-1/2 h-48 md:h-full object-cover" />
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">{featured[current].title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{featured[current].description}</p>
              </div>
              <div className="flex gap-3 mt-4">
                {featured[current].demoUrl && (
                  <a href={featured[current].demoUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium">Live Demo</a>
                )}
                {featured[current].githubUrl && (
                  <a href={featured[current].githubUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-card border border-primary text-primary rounded-md font-medium">GitHub</a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FeaturedProjectsCarousel;
