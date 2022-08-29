import React from 'react';
import ReactDOMServer from 'react-dom/server';
import styles from './index.module.scss';

interface Props {
  children: JSX.Element;
}

const getStabilityClass = (stability: string) => {
  if (stability.includes('Stability: 0 - ')) {
    return styles.stabilityLevel0;
  }

  if (stability.includes('Stability: 1 - ')) {
    return styles.stabilityLevel1;
  }

  if (stability.includes('Stability: 2 - ')) {
    return styles.stabilityLevel2;
  }

  return styles.stabilityLevel3;
};

const Stability = ({ children }: Props) => {
  return (
    <div
      className={`${styles.stability} ${getStabilityClass(
        ReactDOMServer.renderToString(children)
      )}`}
    >
      {children}
    </div>
  );
};

export default Stability;
