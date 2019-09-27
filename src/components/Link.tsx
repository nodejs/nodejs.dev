import { Link } from 'gatsby';
import React from 'react';


interface UniversalLinkProps {
  children: React.ReactNode;
};

const UniversalLink = (props: UniversalLinkProps & any) => {
	const { to, children } = props;
  if (to.includes('http')) {
    // render absolute link
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  } else {
		// render gatsby optimized link
    return <Link to={to} {...props}>{children}</Link>;
  }
};

export default UniversalLink;
