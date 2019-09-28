import React from 'react';
import Button from '../../../Button/button';
import Link from '../../../Link/Link';

import styles from './partner-section.module.scss';

const PartnerSection = ({ content }) => (
  <section className={styles.partnerSection}>
    <h4 className="t-headline">
      {content.section5_1}
    </h4>
    <p>{content.section5_2}</p>
    <div className={styles.partnersLogoContainer}>
      {content.section5_3.images.map((url, i) => (
        <img src={url} alt="" key={`partner-item-${i}`} />
      ))}
    </div>
  </section>
);

export default PartnerSection;
