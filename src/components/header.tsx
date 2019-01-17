import React from 'react';
import { Link } from 'gatsby';

import logo from '../images/logo.svg';

type Props = {
  siteTitle: string
}

const Header = ({ siteTitle }: Props) => (
  <div
    style={{
      borderBottom: '1px solid var(--gray2)',
      marginBottom: '1.4rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 1024,
        padding: '1.4rem 1.2rem',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <img src={logo} style={{ width: '120px', margin: '14px 24px 0 0' }} />
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'var(--gray9)',
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
