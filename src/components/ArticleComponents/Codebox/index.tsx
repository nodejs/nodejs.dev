import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { highlight, languages } from 'prismjs';
import { sanitize } from 'isomorphic-dompurify';
import classnames from 'classnames';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
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
  language
    .replace(/mjs|cjs|javascript/i, 'js')
    .replace(/console|shell/i, 'bash');

const Codebox = ({ children: { props } }: Props): JSX.Element => {
  const [parsedCode, setParsedCode] = useState('');
  const [copied, copyText] = useCopyToClipboard();
  const [langIndex, setLangIndex] = useState(0);
  const [labelLang, setLabelLang] = useState('LANG');
  const [stringCode, setStringCode] = useState('');

  // eslint-disable-next-line react/prop-types
  const className = props.className || 'LANG';
  // Language Matches in class
  const matches = className.match(/language-(?<lang>.*)/);
  // Language name from classname
  const language = matches?.groups?.lang || 'text';
  const LabelArray = language.split('|') || ['LANG'];
  const codeArray = props.children
    ? props.children.toString().split('------\n')
    : [''];

  const setLabel = () => {
    setLabelLang(LabelArray[langIndex]);
  };

  const setCode = () => {
    setStringCode(codeArray[langIndex]);
    setParsedCode(
      sanitize(
        highlight(codeArray[langIndex], languages.javascript, 'javascript')
      )
    );
  };

  const handleLangChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLangIndex((langIndex + 1) % LabelArray.length);
    setLabel();
    setCode();
  };

  const handleCopyCode = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    copyText(stringCode);
  };

  useEffect(() => {
    setLabel();
    setCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <pre className={classnames(styles.pre, replaceLanguages(className))}>
      <div className={styles.top}>
        <button
          type="button"
          className={styles.lang}
          onClick={handleLangChange}
        >
          {labelLang}
        </button>
        <button type="button" className={styles.copy} onClick={handleCopyCode}>
          <FormattedMessage id="components.codeBox.copy" values={{ copied }} />
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
