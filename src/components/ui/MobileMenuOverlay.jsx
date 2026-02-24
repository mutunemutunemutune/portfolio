import React, { useEffect, useState } from 'react';
// Utility to get online status
function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return online;
}
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';


const MobileMenuOverlay = ({ isOpen, onClose }) => {
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationItems = [
    { path: '/', label: 'Home', icon: 'Home' },
    { path: '/about-section', label: 'About', icon: 'User' },
    { path: '/projects-showcase', label: 'Projects', icon: 'FolderOpen' },
    { path: '/skills-display', label: 'Skills', icon: 'Code2' },
    { path: '/contact-form', label: 'Contact', icon: 'Mail' }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);


  const handleNavClick = (path) => {
    navigate(path);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] md:hidden">
      {/* Backdrop - now fully dark */}
      <div 
        className="fixed inset-0 bg-black/90 animate-fade-in"
        style={{ zIndex: 201 }}
        onClick={handleBackdropClick}
      ></div>
      {/* Menu Panel */}
      <div className="fixed inset-x-0 top-0 bottom-0 bg-card border-t border-border animate-slide-down z-[202]" style={{ zIndex: 202 }}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border relative z-[203]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold font-mono">VD</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold font-heading text-foreground">
                  VICKDEV
                </h2>
             
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-surface transition-all duration-150 ease-smooth z-[204]"
              style={{ position: 'relative', zIndex: 204 }}
              aria-label="Close menu"
            >
              <Icon name="X" size={28} />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto p-6">
            <nav className="space-y-2">
              {navigationItems?.map((item, index) => {
                const isActive = location?.pathname === item?.path;
                return (
                  <button
                    key={item?.path}
                    onClick={() => handleNavClick(item?.path)}
                    className={`w-full flex items-center space-x-4 px-4 py-4 rounded-xl text-left transition-all duration-300 ease-smooth group ${
                      isActive
                        ? 'bg-primary/10 border border-primary/20 text-primary'
                        : 'text-text-secondary hover:text-foreground hover:bg-surface'
                    }`}
                  >
                    <div className={`flex-shrink-0 p-2 rounded-lg transition-all duration-300 ease-smooth ${
                      isActive
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-text-secondary group-hover:bg-primary/10 group-hover:text-primary'
                    }`}>
                      <Icon name={item?.icon} size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-medium">
                          {item?.label}
                        </span>
                        {isActive && (
                          <div className="w-2 h-2 bg-primary rounded-full glow-primary animate-scale-in" />
                        )}
                      </div>
                      <div className="text-sm opacity-60 mt-1">
                        Section {index + 1} of {navigationItems?.length}
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <div className="flex items-center justify-center space-x-4 text-text-secondary">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${isOnline ? 'bg-success' : 'bg-destructive'}`} />
                <span className="text-sm font-mono">{isOnline ? 'Online' : 'Offline'}</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <span className="text-sm font-mono">
                {new Date()?.getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenuOverlay;