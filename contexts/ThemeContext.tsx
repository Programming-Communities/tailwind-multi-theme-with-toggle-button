'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeColors } from '@/types/theme';
import { themes } from '@/constants/themes';

interface ThemeContextType {
  theme: Theme;
  themeColors: ThemeColors;
  setTheme: (theme: Theme) => void;
  toggleDarkLight: () => void;
  availableThemes: { value: Theme; label: string; category: string }[];
  isInitialized: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Default theme for SSR
const defaultTheme: Theme = 'light';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [themeColors, setThemeColors] = useState<ThemeColors>(themes[defaultTheme]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Type-safe availableThemes array
  const availableThemes: { value: Theme; label: string; category: string }[] = [
    { value: 'light', label: 'Light', category: 'basic' },
    { value: 'dark', label: 'Dark', category: 'basic' },
    { value: 'professional-blue', label: 'Professional Blue', category: 'professional' },
    { value: 'corporate-green', label: 'Corporate Green', category: 'professional' },
    { value: 'premium-purple', label: 'Premium Purple', category: 'premium' },
    { value: 'luxury-gold', label: 'Luxury Gold', category: 'premium' },
    { value: 'minimal-gray', label: 'Minimal Gray', category: 'minimal' },
    { value: 'tech-cyan', label: 'Tech Cyan', category: 'tech' }
  ];

  useEffect(() => {
    // Client-side initialization
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
      setThemeColors(themes[savedTheme]);
    } else {
      // Use default theme
      setTheme(defaultTheme);
      setThemeColors(themes[defaultTheme]);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    setThemeColors(themes[theme]);
    localStorage.setItem('theme', theme);
    
    const root = document.documentElement;
    
    // Set CSS variables
    Object.entries(themes[theme]).forEach(([key, value]) => {
      if (key === 'text') {
        // Handle nested text object
        Object.entries(value as any).forEach(([textKey, textValue]) => {
          root.style.setProperty(`--text-${textKey}`, textValue as string);
        });
      } else if (key === 'shadow') {
        root.style.setProperty('--shadow', value as string);
      } else {
        root.style.setProperty(`--${key}`, value as string);
      }
    });

    // Update meta theme color for mobile browsers
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", themes[theme].primary);
    }
  }, [theme, isInitialized]);

  const toggleDarkLight = () => {
    setTheme(current => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'light';
      return current.includes('dark') ? 'light' : 'dark';
    });
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      themeColors, 
      setTheme, 
      toggleDarkLight,
      availableThemes,
      isInitialized
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};