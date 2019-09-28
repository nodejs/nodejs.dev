import React from 'react';
import Button from '../../../Button/button';
import Link from '../../../Link/Link';

import styles from './community-section.module.scss';

const CommunitySection = ({ content }) => (
  <section className={styles.communitySection}>
    <h4 className="t-headline">
      <span className={styles.accent}>Join</span> the community
    </h4>
    <div className={styles.subscribe}>
      <p className="t-body2">
        We’ll never share your information and always respect your inbox -
        quality content only, we promise.
      </p>
      <div className={styles.inputBlock}>
        <input
          type="email"
          placeholder="node@nodejs.dev"
        />
        <Button className="t-body1">
          Subscribe
        </Button>
      </div>
    </div>
    <Link className={styles.seeMoreEvents} to='/events'>
      See events near you ⟶
    </Link>
  </section>
);

export default CommunitySection;
