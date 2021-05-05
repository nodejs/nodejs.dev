import React from 'react';
import { Link } from 'gatsby';
import { LinkHeaderProps } from '../utils/types'

export default function LinkHeader({ to, classes, title, activeClassName, partiallyActive }: LinkHeaderProps): JSX.Element {
  return (
    <li className="nav__tabs">
      <Link
        to={to}
        className={classes}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
      >
        {title}
      </Link>
    </li>
  );
};
