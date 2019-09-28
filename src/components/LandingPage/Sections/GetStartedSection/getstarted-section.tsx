import React from 'react';
import { Link, Button } from '../../../';

import styles from './getstarted-section.module.scss';

const GetStartedSection = ({ content }: any) => (
  <section className={styles.getstartedSection}>
    <div className={styles.resources}>
      {content.blocks.map(({ image, title, desc, link }: {image: string, title: string, desc: string, link: string}, i: number) => (
        <Link to={link} className={styles.item} key={`get-started-block-${i}`}>
          <img src={image} alt="" />
          <h5 className="t-headline">{title}</h5>
          <p>{desc}</p>
        </Link>
      ))}
    </div>
    <Button to="/learn">{content.actionButton}</Button>
  </section>
);

export default GetStartedSection;
