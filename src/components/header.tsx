import React from 'react';
import { Link } from 'gatsby';

import logo from '../images/logo.svg';

type Props = {
  siteTitle: string
}

const Header = ({ siteTitle }: Props) => (
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
          <img src={logo} alt={siteTitle} className="nav__logo"/>
        </Link>
      </li>
    </ul>
  </nav>
)

export default Header
