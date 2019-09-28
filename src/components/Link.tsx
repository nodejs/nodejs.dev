import { Link } from 'gatsby';
import React from 'react';

const UniversalLink = props => {
  const { to, children } = props;
  if (to.includes('http')) {
    // render absolute link
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  // render gatsby optimized link
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
};

export default UniversalLink;
