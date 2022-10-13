import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { ReactComponent as LogoLight } from '../../images/logos/nodejs-logo-light-mode.svg';
import { ReactComponent as LogoDark } from '../../images/logos/nodejs-logo-dark-mode.svg';
import { CommonComponents } from '../../components';
import styles from './index.module.scss';

const Header = (): JSX.Element => (
  <nav aria-label="Primary" className={styles.header}>
    <div className={styles.container}>
      <div className={styles.startWrapper}>
        <Link to="/" aria-label="Homepage">
          <div className={styles.logo}>
            <LogoLight className="light-mode-only" />
            <LogoDark className="dark-mode-only" />
          </div>
        </Link>
      </div>

      <ul className={styles.tabs}>
        <li>
          <Link to="/learn/" activeClassName={styles.active} partiallyActive>
            <FormattedMessage id="components.header.links.learn" />
          </Link>
        </li>
        <li>
          <Link to="/about/" activeClassName={styles.active} partiallyActive>
            <FormattedMessage id="components.header.links.about" />
          </Link>
        </li>
        <li>
          <Link to="/api/" activeClassName={styles.active} partiallyActive>
            <FormattedMessage id="components.header.links.docs" />
          </Link>
        </li>
        <li>
          <Link to="/download/" activeClassName={styles.active} partiallyActive>
            <FormattedMessage id="components.header.links.download" />
          </Link>
        </li>
        <li>
          <a href="https://openjsf.org/certification/">
            <FormattedMessage id="components.header.links.certification" />
          </a>
        </li>
      </ul>

      <div className={styles.endWrapper}>
        <ul className={styles.rightContainer}>
          <li className={styles.searchBar}>
            <span className="sr-only">Search Bar</span>
            <CommonComponents.SearchBar />
          </li>

          <li>
            <CommonComponents.DarkModeToggle />
          </li>

          <li>
            <CommonComponents.LanguageSelector />
          </li>

          <li>
            <a
              target="_blank"
              href="https://github.com/nodejs/nodejs.dev"
              rel="noopener noreferrer"
            >
              <span className="sr-only">GitHub</span>
              <FontAwesomeIcon
                icon={faGithub}
                color="var(--color-text-accent)"
                style={{ padding: '1rem', width: '2rem', height: '2rem' }}
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
