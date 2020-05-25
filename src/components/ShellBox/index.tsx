import React from 'react';

import './ShellBox.scss';

interface Props {
  textToCopy: string;
  children: React.ReactNode;
}

const ShellBox = ({ children, textToCopy }: Props): JSX.Element => (
  <pre className="shell-box">
    <div className="shell-box-top">
      <span>SHELL</span>
      <button
        type="button"
        onClick={(event: React.MouseEvent<HTMLButtonElement>): void => {
          event.preventDefault();
          navigator.clipboard.writeText(textToCopy);
        }}
      >
        copy
      </button>
    </div>
    <code>{children}</code>
  </pre>
);

export default ShellBox;
