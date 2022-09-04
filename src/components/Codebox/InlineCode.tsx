import React from 'react';
import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
}

const InlineCode = ({ children }: Props): JSX.Element => (
  <code className={styles.code}>{children}</code>
);

export default InlineCode;
