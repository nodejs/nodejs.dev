import React from 'react';
import styles from './index.module.scss';

const Alert = ({ children }: React.PropsWithChildren): JSX.Element => (
  <div className={styles.alert}>{children}</div>
);

export default Alert;
