import React from 'react';

import Link from '../Link';
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

const Header = () => (
  <header className={styles.mainHeader}>
    <nav className={styles.navigation}>
      <Link to="/">
        <img src={logo} alt="Node.js" className={styles.navigationLogo} />
      </Link>
      {navigationLinks.map((item, i) => (
        <Link
          to={item.link}
          key={`header-navigation-link-${i}`}
          className={styles.navigationItem}
        >
          {item.text}
        </Link>
      ))}
    </nav>
    <div className={styles.panel}>Search Theme</div>
  </header>
);

export default Header;
