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
  const [stringCode, setStringCode] = useState('');
  // eslint-disable-next-line react/prop-types
  const className = props.className || 'text';
  // Language Matches in class
  const matches = className.match(/language-(?<lang>.*)/);
  const languageOptions = (matches?.groups?.lang || 'text').split('|');
  const language = languageOptions[langIndex];
  const codeArray = props.children?props.children.toString().split('-------\n'): [''];

  const handleCopyCode = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    copyText(stringCode);
  };
  
  useEffect(():void => {
    setStringCode(codeArray[langIndex]);

    const parsedLanguage = replaceLanguages(language);
    const prismLanguage = languages[parsedLanguage] || languages.text;

    setParsedCode(
      highlight(stringCode, prismLanguage, parsedLanguage)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langIndex]);

  return (
    <pre className={classnames(styles.pre, replaceLanguages(className))}>
      <div className={styles.top}>
        <div className={styles.langBox}>
          {languageOptions.map((lang, index) => (
            <button
              type="button"
              key={lang}
              className={styles.lang}
              onClick={() => setLangIndex(index)}
            >
              {lang}
            </button>
          ))}
        </div>
        <button type="button" className={styles.copy} onClick={handleCopyCode}>
          <FormattedMessage id="components.codeBox.copy" values={{ copied }} />
        </button>
      </div>
      <div
        className={styles.content}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: parsedCode }}
      />
      <div>
      language: {language}<br />
      index: {langIndex}<br />
      string code:{stringCode}<br />
      </div>
    </pre>
  );
};

export default Codebox;
