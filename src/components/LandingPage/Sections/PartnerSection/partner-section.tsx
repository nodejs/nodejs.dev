import React from 'react';

import styles from './partner-section.module.scss';

interface PartnerSectionProps {
  content: {
    title: string;
    desc: string;
    partnersLogoList: [string];
  };
}

const PartnerSection = ({ content }: PartnerSectionProps): JSX.Element => (
  <section className={styles.partnerSection}>
    <h4 className="t-headline">{content.title}</h4>
    <p>{content.desc}</p>
    <div className={styles.partnersLogoContainer}>
      {content.partnersLogoList.map(
        (url: string, i: number): JSX.Element => (
          <img src={url} alt="" key={`partner-item-${i * 3.14}`} />
        )
      )}
    </div>
  </section>
);

export default PartnerSection;
