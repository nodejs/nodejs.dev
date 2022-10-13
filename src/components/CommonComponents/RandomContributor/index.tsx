import React, { MutableRefObject, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import AnimatedPlaceholder from '../AnimatedPlaceholder';
import { useOnScreen } from '../../../hooks/useOnScreen';
import { useNodeJsContributorsApi } from '../../../hooks/useNodeJsContributorsApi';
import styles from './index.module.scss';

const RandomContributor = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref as MutableRefObject<Element>, true);
  const contributor = useNodeJsContributorsApi(isVisible);

  return (
    <div ref={ref} className={styles.randomContributor}>
      {!contributor && isVisible && <AnimatedPlaceholder />}
      {contributor && (
        <>
          <div className={styles.randomContributorAvatar}>
            <a
              href={contributor.profileUri}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <img
                src={contributor.avatarUri}
                alt="Avatar of a Node.js contributor"
              />
            </a>
          </div>
          <a
            href={contributor.profileUri}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <FormattedMessage
              id="components.randomContributor.thankYou"
              values={{
                contributor: contributor.login,
                amount: contributor.contributionsCount,
              }}
            />
          </a>
        </>
      )}
    </div>
  );
};

export default RandomContributor;
