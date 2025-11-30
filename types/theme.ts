export type Theme = 
  | 'light' 
  | 'dark' 
  | 'professional-blue' 
  | 'corporate-green' 
  | 'premium-purple' 
  | 'luxury-gold' 
  | 'minimal-gray' 
  | 'tech-cyan';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    accent: string;
  };
  border: string;
  success: string;
  warning: string;
  error: string;
  shadow: string;
}

export type ThemeConfig = {
  [key in Theme]: ThemeColors;
};