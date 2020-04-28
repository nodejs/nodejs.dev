import React from 'react';
import { fixTocCodeTag } from '../util/tocFormatter';

type Props = {
  heading: string;
  tableOfContents: string;
};

const TOC = ({ heading, tableOfContents }: Props) => {
  if (!tableOfContents) {
    return null;
  }
  tableOfContents = fixTocCodeTag(tableOfContents);

  return (
    <details className="toc">
      <summary>
        <h6>{heading}</h6>
      </summary>
      <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
    </details>
  );
};

export default TOC;
