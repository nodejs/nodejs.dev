import React from 'react';
import classnames from 'classnames';
import FooterLinksItem from '../FooterLinksItem';
import './styles.scss';

interface FooterItem {
  id: string;
  children: React.ReactNode;
  href?: string;
  rel?: string;
  target?: string;
}

export interface FooterLinksProps {
  links: FooterItem[];
  className?: string;
  itemClassName?: string;
}

function FooterLinks({
  links,
  className,
  itemClassName,
}: FooterLinksProps): JSX.Element {
  return (
    <ul className={classnames('footer-links', className)}>
      {links.map(link => (
        <li
          className={classnames('footer-links__item', itemClassName)}
          key={link.id}
        >
          {link.href ? (
            <FooterLinksItem
              href={link.href}
              rel={link.rel}
              target={link.target}
            >
              {link.children}
            </FooterLinksItem>
          ) : (
            link.children
          )}
        </li>
      ))}
    </ul>
  );
}

export default FooterLinks;
