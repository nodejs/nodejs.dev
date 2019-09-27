import React from 'react';
import Link from '../../../Link';

import styles from './main-section.module.scss';

const nodeVersion = 'Version 10.15.3';

const MainSection = ({ content }) => (
  <section className={styles.mainSection}>
    <h1 className={styles.title}>{content.section1_1}</h1>
    <p className={styles.subTitle}>{content.section1_2}</p>
    <div className="btn-ctas">
      <div className="download-lts-container">
        <button className="download-lts-cta t-body1" type="button">
          Download Node (LTS)
        </button>
        <p className="links t-caption">
          {nodeVersion} - <Link to="/download">What’s new</Link> /{' '}
          <Link to="/download">Get Current</Link>
        </p>
      </div>
      <Link to="/learn">
        <button className="learn-cta t-body1" type="button">
          Learn Node
        </button>
      </Link>
    </div>
  </section>
);

export default MainSection;
