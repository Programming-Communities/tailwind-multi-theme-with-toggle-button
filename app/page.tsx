'use client';

import ThemeSelector from '@/components/ThemeSelector';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';

export default function Home() {
  const { theme, themeColors, isInitialized } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render dynamic styles until mounted
  if (!isMounted || !isInitialized) {
    return (
      <main>
        <ThemeSelector />
        <div className="demo-container">
          <div className="demo-header">
            <h1 className="demo-title">Professional Theme System</h1>
            <p className="demo-subtitle">
              Experience our dynamic theme system with professional color palettes designed for modern web applications.
            </p>
          </div>
          {/* Static content without dynamic styles */}
          <div className="demo-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="demo-card">
                <div style={{ height: '100px', background: 'var(--surface)' }}></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <ThemeSelector />
      
      <div className="demo-container">
        <div className="demo-header">
          <h1 className="demo-title">Professional Theme System</h1>
          <p className="demo-subtitle">
            Experience our dynamic theme system with professional color palettes designed for modern web applications.
          </p>
          <div className="status-item" style={{ marginTop: '16px', display: 'inline-flex' }}>
            <div 
              className="status-dot" 
              style={{ 
                background: themeColors.primary,
                // Inline style ko clean rakhein
                backgroundImage: 'none',
                backgroundSize: 'auto'
              }}
            ></div>
            <span>Current Theme: <strong>{theme}</strong></span>
          </div>
        </div>

        <div className="demo-grid">
          {/* Color Palette Card */}
          <div className="demo-card">
            <h3>Color Palette</h3>
            <p>Professional color scheme for your application</p>
            <div className="color-palette">
              <div className="color-box color-primary">Primary</div>
              <div className="color-box color-secondary">Secondary</div>
              <div className="color-box color-background">Background</div>
              <div className="color-box color-surface">Surface</div>
              <div className="color-box color-success">Success</div>
              <div className="color-box color-warning">Warning</div>
              <div className="color-box color-error">Error</div>
            </div>
          </div>

          {/* Buttons Card */}
          <div className="demo-card">
            <h3>Interactive Elements</h3>
            <p>Buttons and form elements</p>
            <div className="btn-group">
              <button className="btn btn-primary">Primary Action</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-outline">Outline</button>
            </div>
            <div className="btn-group">
              <button className="btn btn-success">Success</button>
              <button className="btn btn-warning">Warning</button>
              <button className="btn btn-error">Error</button>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="demo-card">
            <h3>Status Indicators</h3>
            <p>System status and notifications</p>
            <div className="status-group">
              <div className="status-item status-success">
                <div className="status-dot"></div>
                <span>System Online</span>
              </div>
              <div className="status-item status-warning">
                <div className="status-dot"></div>
                <span>Maintenance</span>
              </div>
              <div className="status-item status-error">
                <div className="status-dot"></div>
                <span>Alert</span>
              </div>
            </div>
          </div>

          {/* Theme Information */}
          <div className="demo-card">
            <h3>Theme Information</h3>
            <p>Current theme configuration</p>
            <div className="theme-info-code">
              <div>Primary: {themeColors.primary}</div>
              <div>Background: {themeColors.background}</div>
              <div>Surface: {themeColors.surface}</div>
              <div>Text Primary: {themeColors.text.primary}</div>
            </div>
          </div>

          {/* Sample Content */}
          <div className="demo-card">
            <h3>Sample Content</h3>
            <p>This demonstrates how text and UI elements appear with the current theme.</p>
            <ul className="demo-list">
              <li>Professional typography</li>
              <li>Consistent spacing</li>
              <li>Accessible color contrast</li>
              <li>Smooth transitions</li>
            </ul>
          </div>

          {/* Features Grid */}
          <div className="demo-card">
            <h3>Theme Features</h3>
            <div className="features-grid">
              <div className="feature-item">
                <h4>🎨 Dynamic</h4>
                <p>8 professional themes</p>
              </div>
              <div className="feature-item">
                <h4>💾 Persistent</h4>
                <p>Saves your preference</p>
              </div>
              <div className="feature-item">
                <h4>📱 Responsive</h4>
                <p>Mobile-friendly design</p>
              </div>
              <div className="feature-item">
                <h4>⚡ Smooth</h4>
                <p>Beautiful transitions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}