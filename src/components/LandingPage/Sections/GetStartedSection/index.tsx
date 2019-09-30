import React from 'react';
import { Link, Button } from '../../..';

import styles from './getstarted-section.module.scss';

interface GetStartedBlock {
  image: string;
  title: string;
  desc: string;
  link: string;
}

interface GetStartedSectionProps {
  content: {
    blocks: GetStartedBlock[];
    actionButton: string;
  };
}

const GetStartedSection = ({
  content,
}: GetStartedSectionProps): JSX.Element => (
  <section className={styles.getstartedSection}>
    <div className={styles.resources}>
      {content.blocks.map(
        (
          { image, title, desc, link }: GetStartedBlock,
          i: number
        ): JSX.Element => (
          <Link
            to={link}
            className={styles.item}
            key={`get-started-block-${i * 3.14}`}
          >
            <img src={image} alt="" />
            <h5 className="t-headline">{title}</h5>
            <p>{desc}</p>
          </Link>
        )
      )}
    </div>
    <Button to="/learn">{content.actionButton}</Button>
  </section>
);

export default GetStartedSection;
