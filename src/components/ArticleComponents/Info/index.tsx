import React from 'react';
import styles from './index.module.scss';

const Info = ({ children }: React.PropsWithChildren): JSX.Element => (
  <div className={styles.info}>{children}</div>
);

export default Info;
