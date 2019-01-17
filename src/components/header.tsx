import React from 'react';
import { Link } from 'gatsby';

import logo from '../images/logo.svg';

type Props = {
  siteTitle: string
}

const Header = ({ siteTitle }: Props) => (
  <div
    style={{
      background: 'white',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <img src={logo} style={{ width: '120px', margin: '14px 24px 0 0' }} />
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'black',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

export default Header
