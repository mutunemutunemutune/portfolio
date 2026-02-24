import React from 'react';

const LoadingSpinner = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
        <div className="h-48 bg-muted" />
        <div className="p-6">
        
        </div>
      </div>
    ))}
  </div>
);

export default LoadingSpinner;
