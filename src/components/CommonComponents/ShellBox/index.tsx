import React, { useEffect, useState } from 'react';
import { copyTextToClipboard } from '../../../util/copyTextToClipboard';
import styles from './index.module.scss';

interface Props {
  textToCopy: string;
}

const ShellBox = ({
  children,
  textToCopy,
}: React.PropsWithChildren<Props>): JSX.Element => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCopied(await copyTextToClipboard(textToCopy));
  };

  useEffect((): (() => void) => {
    let timer: ReturnType<typeof setTimeout>;

    if (copied) {
      timer = setTimeout(() => setCopied(false), 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [copied]);

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
