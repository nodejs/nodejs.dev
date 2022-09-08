import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useDetectOs } from '../../hooks/useDetectOs';
import type { NodeReleaseLTSVersion } from '../../types';
import styles from './index.module.scss';

interface Props {
  title: string;
  subTitle?: string;
  nodeReleasesLTSVersion: NodeReleaseLTSVersion[];
}

const Hero = ({
  title,
  subTitle,
  nodeReleasesLTSVersion,
}: Props): JSX.Element => {
  const { getDownloadLink } = useDetectOs();

  const [currentRelease, ...releases] = nodeReleasesLTSVersion;
  const currentLTS = releases.find(release => !!release.lts) || currentRelease;

  const ltsVersionUrl = getDownloadLink(currentLTS?.version || '');
  const currentVersionUrl = getDownloadLink(currentRelease?.version || '');

  return (
    <div className={styles.hero}>
      <h1>{title}</h1>
      <h2 className={styles.subTitle}>{subTitle}</h2>
      <div className={styles.buttonsContainer}>
        <div className={styles.downloadLtsContainer}>
          <a className={styles.downloadButton} href={ltsVersionUrl}>
            <FormattedMessage id="components.hero.downloadLts" />
            <span>
              <FormattedMessage
                id="components.hero.currentVersion"
                values={{ version: currentLTS.version }}
              />
            </span>
          </a>
          <p className="t-caption">
            <a href={currentVersionUrl}>
              <FormattedMessage
                id="components.hero.getCurrent"
                values={{ version: currentRelease.version }}
              />
            </a>
          </p>
        </div>

        <Link className={styles.downloadButtonInverse} to="/learn">
          <FormattedMessage id="components.hero.learn" />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
