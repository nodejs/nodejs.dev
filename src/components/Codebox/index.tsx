import React, { useEffect, useState, createRef } from 'react';
import { highlightElement } from 'prismjs';
import classnames from 'classnames';
import styles from './index.module.scss';

interface Props {
  children: {
    props: {
      className: string | null;
      children: React.ReactNode;
    };
  };
}

const Codebox = ({ children: { props } }: Props): JSX.Element => {
  const [copied, setCopied] = useState(false);
  const codeRef = createRef<HTMLDivElement>();

  // eslint-disable-next-line react/prop-types
  const className = props.className || '';

  // Language Matches in class
  const matches = className.match(/language-(?<lang>.*)/);

  // Language name from classname
  const language = matches?.groups?.lang || '';

  // Actual Code into a stringified format
  const code = props.children?.toString() || '';

  const codeClassName = classnames(
    styles.prismCode,
    className.replace(/mjs|cjs/, 'js')
  );

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

  useEffect(() => {
    if (codeRef.current) {
      highlightElement(codeRef.current);
    }
  }, [codeRef]);

  return (
    <pre className={codeClassName}>
      <div className={styles.shellBoxTop}>
        <span>{language.toUpperCase()}</span>
        <button
          type="button"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            navigator.clipboard.writeText(code);
            setCopied(true);
          }}
        >
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <div className={styles.shellContent} ref={codeRef}>
        {props.children}
      </div>
    </pre>
  );
};

export default Codebox;
