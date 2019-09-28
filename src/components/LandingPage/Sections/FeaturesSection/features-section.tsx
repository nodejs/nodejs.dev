import React from 'react';

import styles from './features-section.module.scss';

interface FeatureItemProps {
  img: string;
  featureText: string;
}

const FeatureItem = ({ img, featureText }: FeatureItemProps) => {
  return (
    <div className={styles.item}>
      <img src={img} alt="node feature" />
      <p className="t-caption">{featureText}</p>
    </div>
  );
};

const FeaturesSection = ({ content }) => (
  <section className={styles.featuresSection}>
    {content.section3.features.map(({text, image}, i) => (
      <FeatureItem img={image} featureText={text} key={`node-feature-${i}`} />
    ))}
  </section>
);

export default FeaturesSection;
