import React from 'react';
import { useClipboardCopy } from '../../hooks/useClipboardCopy';
import styles from './index.module.scss';

interface Props {
  textToCopy: string;
  children: React.ReactNode;
}

const ShellBox = ({ children, textToCopy }: Props): JSX.Element => {
  const { copied, copy } = useClipboardCopy();

  const handleCopyCode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    copy(textToCopy);
  };

  return (
    <pre className={styles.shellBox}>
      <div className={styles.top}>
        <span>SHELL</span>
        <button type="button" onClick={handleCopyCode}>
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <code>{children}</code>
    </pre>
  );
};

export default ShellBox;
