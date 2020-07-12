import React, { useState } from 'react';
import { Required } from 'utility-types';

type Props = Required<React.Props<unknown>, 'children'>;
type Theme = 'light' | 'dark';

interface State {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext({} as State);

const Provider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    let prefersDarkMode = false;
    let preference: Theme | null = null;
    if (typeof window !== 'undefined') {
      prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      preference = window.localStorage.getItem('prefers-color-scheme') as Theme | null;
    }

    if (preference) {
      return preference;
    }
    return prefersDarkMode ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    setTheme((t) => {
      const newTheme = t === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem('prefers-color-scheme', newTheme);
      return newTheme;
    });
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default Provider;
