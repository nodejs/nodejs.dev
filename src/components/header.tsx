import { Link } from 'gatsby'
import React from 'react'
import logo from '../images/logo.svg'

const Header = () => (
  <nav className="nav">
    <ul
      style={{
        margin: '0 auto',
        padding: '1.4rem 4.8rem',
        display: 'flex',
        alignItems: 'center',
        listStyle: 'none',
      }}
    >
      <li>
        <Link to="/">
          <img src={logo} alt="Node.js" className="nav__logo" />
        </Link>
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
)

export default Header
