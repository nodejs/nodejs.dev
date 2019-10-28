import React from 'react';

export interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps): JSX.Element => {
  return <header className="article-header">{children}</header>;
};

export default Header;
