import React from 'react';
import { Link, Button } from '../../../';

import styles from './main-section.module.scss';

const nodeVersion = 'Version 10.15.3';

const MainSection = ({ content }) => (
  <section className={styles.mainSection}>
    <h1 className={styles.title}>{content.section1_1}</h1>
    <p className={styles.subTitle}>{content.section1_2}</p>
    <div className={styles.buttons}>
      <div className={styles.downloadActions}>
        <Button>Download Node (LTS)</Button>
        <div className={[styles.downloadLinks, 't-caption'].join(' ')}>
          {nodeVersion} - <Link to="/download">What’s new</Link> /{' '}
          <Link to="/download">Get Current</Link>
        </div>
      </div>
      <Button to="/learn" type="secondary">
        Learn Node
      </Button>
    </div>
  </section>
);

export default MainSection;
