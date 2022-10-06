import React, { useEffect, useState } from 'react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import styles from './index.module.scss';

interface Props {
  textToCopy: string;
  children: React.ReactNode;
}

const ShellBox = ({ children, textToCopy }: Props): JSX.Element => {
  const [copied, setCopied] = useState(false);

  const copy = useCopyToClipboard();

  const handleCopyCode = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCopied(await copy(textToCopy));
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
