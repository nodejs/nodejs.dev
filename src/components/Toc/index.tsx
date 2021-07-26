import { Link } from 'gatsby';
import React from 'react';
import { TableOfContents } from '../../types';
// import { fixTocCodeTag } from '../../util/tocFormatter';

interface Props {
  heading: string;
  tableOfContents?: TableOfContents;
}

const TOC = ({ heading, tableOfContents }: Props): null | JSX.Element => {
  if (!tableOfContents?.items) {
    return null;
  }
  // const toc = fixTocCodeTag(tableOfContents);

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
