import React, { useEffect } from 'react';
import { useTheme } from '@skagami/gatsby-plugin-dark-mode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';
import styles from './index.module.scss';

const DarkModeToggle = () => {
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    // This is responsible for setting the color-scheme of the scroll-bars
    if (typeof document === 'object' && document.documentElement) {
      document.documentElement.style['color-scheme'] = theme;
    }
  }, [theme]);

  const handleThemeOnClick = (isKeyPress = false): void => {
    if (isKeyPress) {
      return;
    }

    toggleTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      className={styles.darkModeToggle}
      onClick={() => handleThemeOnClick()}
      onKeyPress={() => handleThemeOnClick(true)}
    >
      <span className="sr-only">Toggle Dark Mode</span>
      <ModeNightIcon className="light-mode-only" />
      <BrightnessMediumIcon className="dark-mode-only" />
    </button>
  );
};

export default DarkModeToggle;
