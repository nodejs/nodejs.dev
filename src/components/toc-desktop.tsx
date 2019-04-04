import React from 'react';

type Props = {
  heading: string;
  tableOfContents: string;
};

function TOCDesktop({ heading, tableOfContents }: Props) {
  return (
    <div className="toc-desktop">
      <nav className="toc-desktop__nav">
        <h6 className="toc-desktop__heading">{heading}</h6>
        <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
      </nav>
    </div>
  );
}

export default TOCDesktop;
