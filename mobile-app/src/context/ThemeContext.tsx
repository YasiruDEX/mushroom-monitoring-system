import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { MD3DarkTheme, MD3LightTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { 
  DarkTheme as NavigationDarkTheme, 
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  theme: any;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleTheme: () => {},
  theme: CombinedDarkTheme,
});

export const useThemeMode = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => {
    const baseTheme = mode === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
    // Customizing the theme to match the original app's colors if needed
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        background: mode === 'dark' ? '#0f0f1a' : '#f5f5f5',
        surface: mode === 'dark' ? '#1a1a2e' : '#ffffff',
        onSurface: mode === 'dark' ? '#ffffff' : '#1a1a2e',
      }
    };
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
