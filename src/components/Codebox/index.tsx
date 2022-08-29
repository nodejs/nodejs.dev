import React, { useEffect, useState } from 'react';
import { highlight, languages } from 'prismjs';
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
  const [parsedCode, setParsedCode] = useState('');

  // eslint-disable-next-line react/prop-types
  const className = props.className || '';

  // Language Matches in class
  const matches = className.match(/language-(?<lang>.*)/);

  // Language name from classname
  const language = matches?.groups?.lang || '';

  // Actual Code into a stringified format
  const stringCode = props.children?.toString() || '';

  const handleCopyCode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigator.clipboard.writeText(stringCode);
    setCopied(true);
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

  useEffect(() => {
    const parsedLangauge = language.replace(/mjs|cjs/, 'js');

    const prismLanguage = languages[parsedLangauge] || languages.text;

    setParsedCode(highlight(stringCode, prismLanguage, parsedLangauge));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <pre className={classnames(styles.pre, className.replace(/mjs|cjs/, 'js'))}>
      <div className={styles.top}>
        <span>{language.toUpperCase()}</span>
        <button type="button" onClick={handleCopyCode}>
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <div
        className={styles.content}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: parsedCode }}
      />
    </pre>
  );
};

export default Codebox;
