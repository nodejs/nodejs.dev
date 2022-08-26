import React, { useEffect } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
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
  const [copied, setCopied] = React.useState(false);

  // eslint-disable-next-line react/prop-types
  const className = props.className || '';

  // Language Matches in class
  const matches = className.match(/language-(?<lang>.*)/);
  // Get language from classname
  const language = (matches?.groups?.lang || '') as Language;
  // Actual Code
  const code = props.children?.toString() || '';

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
    <Highlight
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...defaultProps}
      code={code}
      theme={undefined}
      language={language}
    >
      {({
        className: codeClassName,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <pre
          className={classnames(styles.prismCode, codeClassName)}
          style={style}
        >
          <div className={styles.shellBoxTop}>
            <span>{language.toUpperCase()}</span>
            <button
              type="button"
              onClick={(event: React.MouseEvent<HTMLButtonElement>): void => {
                event.preventDefault();
                navigator.clipboard.writeText(code);
                setCopied(true);
              }}
            >
              {copied ? 'copied' : 'copy'}
              {copied ? <i className="material-icons">done</i> : null}
            </button>
          </div>
          {tokens.map((line, i) => (
            // eslint-disable-next-line react/jsx-key
            <div
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...getLineProps({ line, key: i })}
              className={styles.tokenLine}
            >
              {line.map((token, key) => (
                // eslint-disable-next-line react/jsx-key, react/jsx-props-no-spreading
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default Codebox;
