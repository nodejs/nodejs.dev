import { Link } from 'gatsby';
import React from 'react';
import { useTheme } from '@skagami/gatsby-plugin-dark-mode';
import { ReactComponent as LogoLight } from '../../images/logos/nodejs-logo-light-mode.svg';
import { ReactComponent as LogoDark } from '../../images/logos/nodejs-logo-dark-mode.svg';
import { ReactComponent as GitHubLogo } from '../../images/logos/github-logo.svg';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import SearchBar from '../SearchBar';

const Header = (): JSX.Element => {
  const isMobile = useMediaQuery('(max-width: 870px)');

  const [theme, toggleTheme] = useTheme();

  const handleThemeOnClick = (isKeyPress = false): void => {
    if (isKeyPress) {
      return;
    }

    toggleTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav aria-label="Primary" className="nav">
      <div className="nav__container">
        <div className="nav__startwrapper">
          <Link to="/">
            <div className="logo">
              <LogoLight className="nav__logo light-mode-only" />
              <LogoDark className="nav__logo dark-mode-only" />
            </div>
          </Link>
        </div>

        <ul className="nav__tabs__container">
          <li className="nav__tabs">
            <Link
              to="/learn"
              className="activeStyleTab"
              activeClassName="active"
              partiallyActive
            >
              Learn
            </Link>
          </li>
          <li className="nav__tabs">
            <a
              className="activeStyleTab"
              target="_blank"
              href="https://nodejs.org/en/docs/"
              rel="noopener noreferrer"
            >
              {isMobile ? 'Docs' : 'Documentation'}
            </a>
          </li>
          <li className="nav__tabs">
            <Link
              to="/download"
              className="activeStyleTab"
              activeClassName="active"
              partiallyActive
            >
              Download
            </Link>
          </li>
          <li className="nav__tabs">
            <Link
              to="/community"
              className="activeStyleTab"
              activeClassName="active"
              partiallyActive
            >
              Community
            </Link>
          </li>
        </ul>

        <div className="nav__endwrapper">
          <ul className="right-container">
            <li className="nav__tabs">
              <SearchBar />
            </li>
            <li className="nav__tabs nav__tabs--right">
              {theme && (
                <button
                  type="button"
                  onClick={() => handleThemeOnClick()}
                  className="dark-mode-toggle"
                  onKeyPress={() => handleThemeOnClick(true)}
                >
                  <span className="sr-only">Toggle Dark Mode</span>
                  <i className="material-icons light-mode-only theme-buttons">
                    nights_stay
                  </i>
                  <i className="material-icons dark-mode-only theme-buttons">
                    wb_sunny
                  </i>
                </button>
              )}
            </li>

            <li className="nav__tabs">
              <a
                target="_blank"
                href="https://github.com/nodejs/nodejs.dev"
                rel="noopener noreferrer"
              >
                <span className="sr-only">GitHub</span>
                <GitHubLogo
                  fill="var(--color-text-accent)"
                  style={{ marginBottom: '-3px' }}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
