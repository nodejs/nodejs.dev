import React from 'react';

interface Props {
  children: React.ReactNode;
}

const InlineCode = ({ children }: Props): JSX.Element => (
  <code className="language-text">{children}</code>
);

export default InlineCode;
