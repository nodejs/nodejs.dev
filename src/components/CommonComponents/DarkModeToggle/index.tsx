import React from 'react';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';
import { useTheme } from '../../../hooks/useTheme';
import styles from './index.module.scss';

const DarkModeToggle = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <button
      type="button"
      className={styles.darkModeToggle}
      onClick={() => toggleTheme()}
      onKeyPress={() => toggleTheme(true)}
      aria-pressed={theme === 'dark'}
    >
      <span className="sr-only">Toggle Dark Mode</span>
      <ModeNightIcon className="light-mode-only" />
      <BrightnessMediumIcon className="dark-mode-only" />
    </button>
  );
};

export default DarkModeToggle;
