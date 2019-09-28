import React from 'react';
import { Link, Button } from '../../../';

import styles from './main-section.module.scss';

const nodeVersion = 'Version 10.15.3';

const MainSection = ({ content }: any) => (
  <section className={styles.mainSection}>
    <h1 className={styles.title}>{content.title}</h1>
    <p className={styles.subTitle}>{content.desc}</p>
    <div className={styles.buttons}>
      <div className={styles.downloadActions}>
        <Button>{content.downloadButton}</Button>
        <div className={[styles.downloadLinks, 't-caption'].join(' ')}>
          {nodeVersion} - <Link to="/download">{content.subDownloadMessage}</Link> /{' '}
          <Link to="/download">{content.downloadCurrent}</Link>
        </div>
      </div>
      <Button to="/learn" type="secondary">
        {content.learnNode}
      </Button>
    </div>
  </section>
);

export default MainSection;
