import React from 'react';
import { AnchorHeaderProps } from '../utils/types'

export default function AnchorHeader({ href, classes, title }: AnchorHeaderProps): JSX.Element {
  return (
    <li className="nav__tabs">
      <a
        className={classes}
        target="_blank"
        href={href}
        rel="noopener noreferrer"
      >
        { title }
      </a>
    </li>
  );
};
