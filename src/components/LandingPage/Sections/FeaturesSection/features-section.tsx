import React from 'react';

import styles from './features-section.module.scss';

interface FeatureItemProps {
  image: string;
  text: string;
}

const FeatureItem = ({ image, text }: FeatureItemProps): JSX.Element => {
  return (
    <div className={styles.item}>
      <img src={image} alt="node feature" />
      <p className="t-caption">{text}</p>
    </div>
  );
};

interface FeaturesSectionProps {
  content: {
    featureList: [FeatureItemProps];
  };
}

const FeaturesSection = ({ content }: FeaturesSectionProps): JSX.Element => (
  <section className={styles.featuresSection}>
    {content.featureList.map(
      ({ text, image }: FeatureItemProps, i: number): JSX.Element => (
        <FeatureItem
          image={image}
          text={text}
          key={`node-feature-${i * 3.14}`}
        />
      )
    )}
  </section>
);

export default FeaturesSection;
