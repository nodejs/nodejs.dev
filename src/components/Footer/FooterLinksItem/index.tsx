import React from 'react';

export interface FooterLinksItemProps {
  href?: string;
  children?: React.ReactNode;
  rel?: string;
  target?: string;
}

function FooterLinksItem({
  href,
  rel,
  target,
  children,
}: FooterLinksItemProps): JSX.Element {
  return (
    <a href={href} rel={rel} target={target}>
      {children}
    </a>
  );
}

export default FooterLinksItem;
