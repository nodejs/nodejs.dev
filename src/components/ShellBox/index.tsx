import React, { useEffect } from 'react';
import styles from './index.module.scss';

interface Props {
  textToCopy: string;
  children: React.ReactNode;
}

const ShellBox = ({ children, textToCopy }: Props): JSX.Element => {
  const [copied, setCopied] = React.useState(false);

  useEffect((): (() => void) => {
    let timer: ReturnType<typeof setTimeout>;

    if (copied) {
      timer = setTimeout((): void => {
        setCopied(false);
      }, 3000);
    }

    return (): void => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [copied]);

  return (
    <pre className={styles.shellBox}>
      <div className={styles.top}>
        <span>SHELL</span>
        <button
          type="button"
          onClick={(event: React.MouseEvent<HTMLButtonElement>): void => {
            event.preventDefault();
            navigator.clipboard.writeText(textToCopy);
            setCopied(true);
          }}
        >
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <code>{children}</code>
    </pre>
  );
};

export default ShellBox;
