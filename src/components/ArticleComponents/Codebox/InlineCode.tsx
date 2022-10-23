import React from 'react';
import styles from './index.module.scss';

const InlineCode = ({ children }: React.PropsWithChildren): JSX.Element => (
  <code className={styles.code}>{children}</code>
);

export default InlineCode;
