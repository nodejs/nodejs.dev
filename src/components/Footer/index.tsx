import React from 'react';
import FooterLinks from './FooterLinks';
import { GitHub, OpenJS, Twitter } from './icons';

import './footer.scss';

const MENU_LINKS_LEFT = [
  {
    id: 'Trademark Policy',
    children: 'Trademark Policy',
    href: 'https://nodejs.org/en/about/trademark/',
  },
  {
    id: 'Privacy Policy',
    children: 'Privacy Policy',
    href: 'https://nodejs.org/en/about/privacy/',
  },
  {
    id: 'Code of Conduct',
    children: 'Code of Conduct',
    href:
      'https://github.com/openjs-foundation/cross-project-council/blob/master/CODE_OF_CONDUCT.md#contributor-covenant-code-of-conduct',
  },
  {
    id: 'Security Reporting',
    children: 'Security Reporting',
    href: 'https://nodejs.org/en/security/',
  },
  { id: 'About', children: 'About', href: 'https://nodejs.org/en/about/' },
  { id: 'Blog', children: 'Blog', href: 'https://nodejs.org/en/blog/' },
];

const MENU_LINKS_RIGHT = [
  { id: '© OpenJS Foundation', children: '© OpenJS Foundation' },
  {
    id: 'Github Icon',
    children: <GitHub />,
    href: 'https://github.com/nodejs/node',
    rel: 'noopener noreferrer',
    target: '_blank',
    ariaLabel: 'Node.js Github Page Link',
  },
  {
    id: 'Twitter Icon',
    children: <Twitter />,
    href: 'https://twitter.com/nodejs',
    rel: 'noopener noreferrer',
    target: '_blank',
    ariaLabel: 'Node.js Twitter Link',
  },
  {
    id: 'OpenJS Icon',
    children: <OpenJS />,
    href: 'https://slack.openjsf.org',
    rel: 'noopener noreferrer',
    target: '_blank',
    ariaLabel: 'Node.js Slack Link',
  },
];

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <FooterLinks
        links={MENU_LINKS_LEFT}
        className="footer-links--left"
        itemClassName="footer-links-item--left"
      />
      <FooterLinks
        links={MENU_LINKS_RIGHT}
        className="footer-links--right"
        itemClassName="footer-links-item--right"
      />
    </footer>
  );
}

export default Footer;
