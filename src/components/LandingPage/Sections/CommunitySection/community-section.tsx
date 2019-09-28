import React from 'react';
import { Link, Button } from '../../..';

import styles from './community-section.module.scss';

interface CommunitySectionProps {
  content: {
    title1: string;
    title2: string;
    desc: string;
    subscribe: string;
    eventsLink: string;
  };
}

const CommunitySection = ({ content }: CommunitySectionProps): JSX.Element => (
  <section className={styles.communitySection}>
    <h4 className="t-headline">
      <span className={styles.accent}>{content.title1}</span> {content.title2}
    </h4>
    <div className={styles.subscribe}>
      <p className="t-body2">{content.desc}</p>
      <div className={styles.inputBlock}>
        <input type="email" placeholder="node@nodejs.dev" />
        <Button className="t-body1">{content.subscribe}</Button>
      </div>
    </div>
    <Link className={styles.seeMoreEvents} to="/events">
      {content.eventsLink} ⟶
    </Link>
  </section>
);

export default CommunitySection;
