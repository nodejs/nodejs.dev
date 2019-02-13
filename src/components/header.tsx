import React from 'react'
import { Link } from 'gatsby'

import logo from '../images/logo.svg'

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
          <img
            src={logo}
            alt={siteTitle}
            style={{ height: '62px', margin: '-6px 24px 0 0' }}
          />
        </Link>
      </li>
      <li style={{ paddingLeft: '2rem', marginBottom: '12px' }}>
        <a
          target="_blank"
          style={{ textDecoration: 'none' }}
          href="https://nodejs.org/en/docs/"
        >
          API Docs
        </a>
      </li>
      <li style={{ paddingLeft: '2rem', marginBottom: '12px' }}>
        <a
          target="_blank"
          style={{ textDecoration: 'none' }}
          href="https:github.com/nodejs/website-prototype"
        >
          GitHub
        </a>
      </li>
    </ul>
  </nav>
)

export default Header
