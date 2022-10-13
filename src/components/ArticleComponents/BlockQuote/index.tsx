import React from 'react';
import styles from './index.module.scss';

const BlockQuote = ({ children }: React.PropsWithChildren): JSX.Element => (
  <div className={styles.blockQuote}>{children}</div>
);

export default BlockQuote;
