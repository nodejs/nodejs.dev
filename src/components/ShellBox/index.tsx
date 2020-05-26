import React from 'react';

import './ShellBox.scss';

interface Props {
  textToCopy: string;
  children: React.ReactNode;
}

const ShellBox = ({ children, textToCopy }: Props): JSX.Element => {
  const [copied, setCopied] = React.useState(false);

  return (
    <pre className="shell-box">
      <div className="shell-box-top">
        <span>SHELL</span>
        <button
          type="button"
          onClick={(event: React.MouseEvent<HTMLButtonElement>): void => {
            event.preventDefault();
            navigator.clipboard.writeText(textToCopy);

            setCopied(true);
            setTimeout((): void => {
              setCopied(false);
            }, 3000);
          }}
        >
          {copied ? 'copied' : 'copy'}
          {copied ? <i className="material-icons">done</i> : null}
        </button>
      </div>
      <code>{children}</code>
    </pre>
  );
};

export default ShellBox;
