import React from 'react';
import Button from '../../../Button/button';
import Link from '../../../Link/Link';

import styles from './getstarted-section.module.scss';

const GetStartedSection = ({ content }) => (
  <section className={styles.getstartedSection}>
    <div className={styles.resources}>
      <Link to="/learn" className={styles.item}>
        <img src={content.section6_1_image} alt="" />
        <h5 className="t-headline">{content.section6_1}</h5>
        <p>{content.section6_2}</p>
      </Link>

      <Link to="/docs" className={styles.item}>
        <img src={content.section6_3_image} alt="" />
        <h5 className="t-headline">{content.section6_3}</h5>
        <p>{content.section6_4}</p>
      </Link>
    </div>
    <Button to="/learn">Get Started</Button>
  </section>
);

export default GetStartedSection;
