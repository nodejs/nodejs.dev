import { Link } from 'gatsby';
import React from 'react';
import { css } from 'emotion';
import logo from '../images/logo.svg';

const Header = () => (
  <nav className="nav">
    <ul css={css`
      @media (max-width: 380px) {
        padding: 0;
      }
      margin: 0 auto;
      padding: 0 4.8rem;
      display: flex;
      align-items: center;
      list-style: none;
    `}>
      <li>
        <Link to="/" style={{ display: 'block' }}>
          <img src={logo} alt="Node.js" className="nav__logo" />
        </Link>
      </li>
      <li className="nav__tabs">
        <a target="_blank" href="https://nodejs.org/en/download/">
          Download
        </a>
      </li>
      <li className="nav__tabs">
        <a target="_blank" href="https://nodejs.org/en/docs/">
          API Docs
        </a>
      </li>
      <li className="nav__tabs">
        <a target="_blank" href="https://github.com/nodejs/nodejs.dev">
          GitHub
        </a>
      </li>
    </ul>
  </nav>
);

export default Header;
