import React from 'react';
import { Link } from 'gatsby';
import { TableOfContents } from '../../types';

interface Props {
  heading: string;
  tableOfContents?: TableOfContents;
}

const TOC = ({ heading, tableOfContents }: Props): null | JSX.Element => {
  if (tableOfContents?.items) {
    return (
      <details className="tableOfContents">
        <summary>
          <strong>{heading}</strong>
        </summary>
        <ul>
          {tableOfContents.items.map(i => (
            <li key={i.url}>
              <Link to={i.url}>{i.title}</Link>
            </li>
          ))}
        </ul>
      </details>
    );
  }

  return null;
};

export default TOC;
