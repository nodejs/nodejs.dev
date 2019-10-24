import React from 'react';

import styles from './sandbox-section.module.scss';
import leaf0Illustration from '../../../../images/illustrations/leafs/leaf-0.svg';
import leaf1Illustration from '../../../../images/illustrations/leafs/leaf-1.svg';
import leaf2Illustration from '../../../../images/illustrations/leafs/leaf-2.svg';
import leaf3Illustration from '../../../../images/illustrations/leafs/leaf-3.svg';
import leaf4Illustration from '../../../../images/illustrations/leafs/leaf-4.svg';
import leaf5Illustration from '../../../../images/illustrations/leafs/leaf-5.svg';
import leaf6Illustration from '../../../../images/illustrations/leafs/leaf-6.svg';
import leaf7Illustration from '../../../../images/illustrations/leafs/leaf-7.svg';
import dotsIllustration from '../../../../images/illustrations/dots.svg';

const SandboxSection = (): JSX.Element => (
  <section className={styles.sandboxSection}>
    <div className={styles.sandbox} />
    <div className={styles.leafs}>
			<img src={leaf0Illustration} alt="leaf"/>
			<img src={leaf1Illustration} alt="leaf"/>
			<img src={leaf2Illustration} alt="leaf"/>
			<img src={leaf3Illustration} alt="leaf"/>
			<img src={leaf4Illustration} alt="leaf"/>
			<img src={leaf5Illustration} alt="leaf"/>
			<img src={leaf6Illustration} alt="leaf"/>
			<img src={leaf7Illustration} alt="leaf"/>
    </div>
    <img className={styles.dots} src={dotsIllustration} alt="" />
  </section>
);

export default SandboxSection;
