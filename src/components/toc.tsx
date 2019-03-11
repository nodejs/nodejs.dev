import React from 'react';

type Props = {
  heading: string;
  tableOfContents: string;
};

const TOC = ({ heading, tableOfContents }: Props) => {
  if (!tableOfContents) {
    return null;
  }

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
