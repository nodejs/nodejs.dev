import React from 'react';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import styles from './index.module.scss';

interface Props {
  textToCopy: string;
}

const ShellBox = ({
  children,
  textToCopy,
}: React.PropsWithChildren<Props>): JSX.Element => {
  const [copied, copyText] = useCopyToClipboard();

  const handleCopyCode = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    copyText(textToCopy);
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
