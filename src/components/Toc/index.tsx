import React from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { TableOfContents } from '../../types';

interface Props {
  heading: string;
  tableOfContents?: TableOfContents;
}

const TOC = ({ heading, tableOfContents }: Props): null | JSX.Element => {
  if (!tableOfContents?.items) {
    return null;
  }

  return (
    <details className="toc">
      <summary>
        <h6>{heading}</h6>
      </summary>
      {/* eslint-disable react/no-danger */}
      <ul className="tableOfContents">
        {tableOfContents.items.map(i => (
          <li key={i.url}>
            <Link to={i.url}>{i.title}</Link>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default TOC;
