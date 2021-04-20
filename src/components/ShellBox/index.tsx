import React from 'react';
import { useHover } from '../../hooks';

import './ShellBox.scss';

interface Props {
  textToCopy: string;
  children: React.ReactNode;
}

const ShellBox = ({ children, textToCopy }: Props): JSX.Element => {
  const [copied, setCopied] = React.useState(false);
  const codeRef = React.useRef<HTMLElement>(null);
  const isHover = useHover(codeRef);

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

  React.useEffect((): void => {
    const element = codeRef.current;
    const { scrollWidth = 0, offsetWidth = 0 } = element || {};

    if (element && scrollWidth > offsetWidth) {
      if (isHover) {
        element.style.overflowX = 'scroll';
        element.style.paddingBottom = '0px';
      } else {
        element.style.overflowX = 'hidden';
        element.style.paddingBottom = '.5em';
      }
    }
  }, [isHover]);

  return (
    <pre className="shell-box">
      <div className="shell-box-top">
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
          {copied ? <i className="material-icons">done</i> : null}
        </button>
      </div>
      <code ref={codeRef}>{children}</code>
    </pre>
  );
};

export default ShellBox;
