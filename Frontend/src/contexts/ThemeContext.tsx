import React, { createContext, useContext, useState, useEffect } from 'react';

type MoodType = "great" | "good" | "neutral" | "bad" | "terrible";

// Define theme colors for each mood
export const moodColors = {
  terrible: {
    primary: '#FF5252', // Red
    secondary: '#FF7676',
    background: 'rgba(255, 82, 82, 0.05)',
    light: '#FFE5E5',
    surface: '#FFF5F5',
    text: '#B71C1C', // Dark red for text
    textMuted: 'rgba(183, 28, 28, 0.7)' // Muted red text
  },
  bad: {
    primary: '#FFC107', // Yellow
    secondary: '#FFD54F',
    background: 'rgba(255, 193, 7, 0.05)',
    light: '#FFF8E1',
    surface: '#FFFDF5',
    text: '#F57F17', // Dark yellow/amber for text
    textMuted: 'rgba(245, 127, 23, 0.7)' // Muted yellow text
  },
  neutral: {
    primary: '#4CAF50', // Green
    secondary: '#81C784',
    background: 'rgba(76, 175, 80, 0.05)',
    light: '#E8F5E9',
    surface: '#F5FFF5',
    text: '#2E7D32', // Dark green for text
    textMuted: 'rgba(46, 125, 50, 0.7)' // Muted green text
  },
  good: {
    primary: '#4F7AFF', // Blue
    secondary: '#7B9CFF',
    background: 'rgba(79, 122, 255, 0.05)',
    light: '#E3F2FD',
    surface: '#F5FAFF',
    text: '#1565C0', // Dark blue for text
    textMuted: 'rgba(21, 101, 192, 0.7)' // Muted blue text
  },
  great: {
    primary: '#8A4FFF', // Purple
    secondary: '#B39DFF',
    background: 'rgba(138, 79, 255, 0.05)',
    light: '#EDE7F6',
    surface: '#F5F0FF',
    text: '#4527A0', // Dark purple for text
    textMuted: 'rgba(69, 39, 160, 0.7)' // Muted purple text
  }
};

interface ThemeContextProps {
  currentMood: MoodType | null;
  setCurrentMood: (mood: MoodType | null) => void;
  themeColors: typeof moodColors.great;
}

const defaultTheme = moodColors.neutral;

const ThemeContext = createContext<ThemeContextProps>({
  currentMood: null,
  setCurrentMood: () => {},
  themeColors: defaultTheme,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [themeColors, setThemeColors] = useState(defaultTheme);

  // Update theme colors when mood changes
  useEffect(() => {
    if (currentMood) {
      setThemeColors(moodColors[currentMood]);
      
      // Update CSS variables
      document.documentElement.style.setProperty('--mental-primary', moodColors[currentMood].primary);
      document.documentElement.style.setProperty('--mental-secondary', moodColors[currentMood].secondary);
      document.documentElement.style.setProperty('--mental-background', moodColors[currentMood].background);
      document.documentElement.style.setProperty('--mental-light', moodColors[currentMood].light);
      document.documentElement.style.setProperty('--mental-surface', moodColors[currentMood].surface);
      document.documentElement.style.setProperty('--mental-text', moodColors[currentMood].text);
      document.documentElement.style.setProperty('--mental-text-muted', moodColors[currentMood].textMuted);
      
      // Update document title with mood
      document.title = `Mental Health Copilot - ${currentMood.charAt(0).toUpperCase() + currentMood.slice(1)}`;
    }
  }, [currentMood]);

  return (
    <ThemeContext.Provider value={{ currentMood, setCurrentMood, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 