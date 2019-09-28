import React from 'react';

import styles from './partner-section.module.scss';

const PartnerSection = ({ content }: any) => (
  <section className={styles.partnerSection}>
    <h4 className="t-headline">{content.title}</h4>
    <p>{content.desc}</p>
    <div className={styles.partnersLogoContainer}>
      {content.partnersLogoList.map((url: string, i: number) => (
        <img src={url} alt="" key={`partner-item-${i}`} />
      ))}
    </div>
  </section>
);

export default PartnerSection;
