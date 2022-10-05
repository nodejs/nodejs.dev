import React from 'react';
import { useTheme } from '@skagami/gatsby-plugin-dark-mode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';
import { useSetDocumentColorScheme } from '../../hooks/useSetDocumentColorScheme';
import styles from './index.module.scss';

const DarkModeToggle = () => {
  const [theme, toggleTheme] = useTheme();

  useSetDocumentColorScheme(theme);

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
