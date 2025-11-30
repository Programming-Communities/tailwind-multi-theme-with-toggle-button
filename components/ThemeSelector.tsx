'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect } from 'react';
import { themes } from '@/constants/themes'; // Yeh import add karo

// Custom icons without SVG to avoid hydration issues
const IconPalette = () => <span>🎨</span>;
const IconMoon = () => <span>🌙</span>;
const IconSun = () => <span>☀️</span>;
const IconClose = () => <span>✕</span>;

const ThemeSelector = () => {
  const { theme, setTheme, toggleDarkLight, availableThemes, isInitialized } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const themeCategories = {
    basic: 'Basic Themes',
    professional: 'Professional',
    premium: 'Premium',
    minimal: 'Minimal',
    tech: 'Tech'
  };

  const getThemeIcon = (themeValue: string) => {
    const icons: { [key: string]: string } = {
      'light': '☀️',
      'dark': '🌙',
      'professional-blue': '💼',
      'corporate-green': '🏢',
      'premium-purple': '🎯',
      'luxury-gold': '⭐',
      'minimal-gray': '⚫',
      'tech-cyan': '🔷'
    };
    return icons[themeValue] || '🎨';
  };

  // Don't render until mounted on client
  if (!isMounted || !isInitialized) {
    return (
      <button
        className="floating-theme-btn"
        style={{ visibility: 'hidden' }}
        title="Change Theme"
      >
        <IconPalette />
      </button>
    );
  }

  return (
    <>
      {/* Floating Theme Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="floating-theme-btn"
        title="Change Theme"
      >
        <IconPalette />
      </button>

      {/* Theme Modal */}
      {isOpen && (
        <div className="theme-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="theme-modal" onClick={(e) => e.stopPropagation()}>
            <div className="theme-modal-header">
              <h3>Select Theme</h3>
              <button onClick={() => setIsOpen(false)} className="close-btn">
                <IconClose />
              </button>
            </div>

            <div className="theme-categories">
              {Object.entries(themeCategories).map(([category, title]) => (
                <div key={category} className="theme-category">
                  <h4 className="category-title">{title}</h4>
                  <div className="theme-grid">
                    {availableThemes
                      .filter(t => t.category === category)
                      .map((themeOption) => (
                        <button
                          key={themeOption.value}
                          onClick={() => {
                            setTheme(themeOption.value);
                            setIsOpen(false);
                          }}
                          className={`theme-card ${theme === themeOption.value ? 'active' : ''}`}
                          style={{
                            '--theme-primary': themes[themeOption.value].primary,
                            '--theme-bg': themes[themeOption.value].background
                          } as React.CSSProperties}
                        >
                          <div className="theme-preview">
                            <div className="preview-header" style={{ background: themes[themeOption.value].primary }}>
                              <span className="preview-dot" style={{ background: themes[themeOption.value].text.accent }}></span>
                              <span className="preview-dot" style={{ background: themes[themeOption.value].text.accent }}></span>
                              <span className="preview-dot" style={{ background: themes[themeOption.value].text.accent }}></span>
                            </div>
                            <div className="preview-content">
                              <div className="preview-bar" style={{ background: themes[themeOption.value].primary }}></div>
                              <div className="preview-bar" style={{ background: themes[themeOption.value].surface }}></div>
                            </div>
                          </div>
                          <span className="theme-icon">{getThemeIcon(themeOption.value)}</span>
                          <span className="theme-name">{themeOption.label}</span>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="theme-modal-actions">
              <button onClick={toggleDarkLight} className="toggle-mode-btn">
                {theme === 'light' || theme === 'professional-blue' || theme === 'corporate-green' || theme === 'premium-purple' || theme === 'minimal-gray' ? (
                  <><IconMoon /> Dark Mode</>
                ) : (
                  <><IconSun /> Light Mode</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeSelector;