/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-key */
import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';

import './Codebox.scss';

interface Props {
  children: {
    props: {
      className: string;
      children: React.ReactNode;
    };
  };
}

const Codebox = ({ children: { props } }: Props): JSX.Element => {
  const [copied, setCopied] = React.useState(false);

  // Language Matches in class
  // eslint-disable-next-line react/prop-types
  const matches = props.className.match(/language-(?<lang>.*)/);
  // Get language from classname
  const language = (
    matches && matches.groups && matches.groups.lang ? matches.groups.lang : ''
  ) as Language;
  // Actual Code
  const code = props.children?.toString() || '';

  React.useEffect((): (() => void) => {
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
      {...defaultProps}
      code={code}
      theme={undefined}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          <div className="shell-box-top">
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
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
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
