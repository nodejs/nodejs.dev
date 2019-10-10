import React from 'react';

import styles from './sandbox-section.module.scss';
import dotsIllustration from '../../../../images/illustrations/dots.svg';

const SandboxSection = (): JSX.Element => (
  <section className={styles.sandboxSection}>
    <div className={styles.sandbox} />
    <div className={styles.flyingAnimation}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <img className={styles.dots} src={dotsIllustration} alt="" />
  </section>
);

export default SandboxSection;
