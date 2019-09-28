import React from 'react';

import { Link } from '..';
import logo from '../../images/logo.svg';
import styles from './header.module.scss';

// should be reaplaced with GraphQL data
const navigationLinks = [
  {
    link: 'https://nodejs.org/en/docs/',
    text: 'Documentation',
  },
  {
    link: 'https://github.com/nodejs/nodejs.dev',
    text: 'GitHub',
  },
  {
    link: 'https://nodejs.org/en/download/',
    text: 'Downloads',
  },
];

const Header = (): JSX.Element => (
  <header className={styles.mainHeader}>
    <nav className={styles.navigation}>
      <Link to="/">
        <img src={logo} alt="Node.js" className={styles.navigationLogo} />
      </Link>
      {navigationLinks.map(
        (item, i): JSX.Element => (
          <Link
            to={item.link}
            key={`header-navigation-link-${i * 3.14}`}
            className={styles.navigationItem}
          >
            {item.text}
          </Link>
        )
      )}
    </nav>
    <div className={styles.panel}>
      <div className={styles.navigationItem}>
        <button
          className={styles.themeToggler}
          onClick={(): boolean => document.body.classList.toggle('dark-mode')}
          title="Toggle theme"
          type="button"
        >
          <i className="material-icons light-mode-only">nights_stay</i>
          <i className="material-icons dark-mode-only">wb_sunny</i>
        </button>
      </div>
    </div>
  </header>
);

export default Header;
