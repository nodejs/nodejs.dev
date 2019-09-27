import React from 'react';

import styles from './main-section.module.scss';

const MainSection = ({ content }) => (
  <section className={styles.mainSection}>
    <h1>{content.section1_1}</h1>
    <p>{content.section1_2}</p>
  </section>
);

export default MainSection;
