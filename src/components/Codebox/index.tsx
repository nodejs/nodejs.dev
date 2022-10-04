import React, { useEffect, useState } from 'react';
import { highlight, languages } from 'prismjs';
import { sanitize } from 'isomorphic-dompurify';
import classnames from 'classnames';
import { useClipboardCopy } from '../../hooks/useClipboardCopy';
import styles from './index.module.scss';

interface Props {
  children: {
    props: {
      className: string | null;
      children: React.ReactNode;
    };
  };
}

const replaceLanguages = (language: string) =>
  language.replace(/mjs|cjs|javascript/i, 'js').replace('console', 'bash');

const Codebox = ({ children: { props } }: Props): JSX.Element => {
  const { copied, copy } = useClipboardCopy();
  const [parsedCode, setParsedCode] = useState('');

  // eslint-disable-next-line react/prop-types
  const className = props.className || 'text';

  // Language Matches in class
  const matches = className.match(/language-(?<lang>.*)/);

  // Language name from classname
  const language = matches?.groups?.lang || 'text';

  // Actual Code into a stringified format
  const stringCode = props.children?.toString() || '';

  const handleCopyCode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    copy(stringCode);
  };

  useEffect(() => {
    const parsedLangauge = replaceLanguages(language);

    const prismLanguage = languages[parsedLangauge] || languages.text;

    setParsedCode(
      sanitize(highlight(stringCode, prismLanguage, parsedLangauge))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <pre className={classnames(styles.pre, replaceLanguages(className))}>
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
