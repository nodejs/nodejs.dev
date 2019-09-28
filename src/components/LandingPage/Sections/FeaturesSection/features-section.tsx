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

const FeaturesSection = ({ content }: any) => (
  <section className={styles.featuresSection}>
    {content.featureList.map(
      ({ text, image }: { text: string; image: string }, i: number) => (
        <FeatureItem img={image} featureText={text} key={`node-feature-${i}`} />
      )
    )}
  </section>
);

export default FeaturesSection;
