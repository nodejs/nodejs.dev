import React, { MutableRefObject, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import AnimatedPlaceholder from '../AnimatedPlaceholder';
import { useNodeJsContributorsApi, useOnScreen } from '../../hooks';
import './RandomContributor.scss';

const RandomContributor = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref as MutableRefObject<Element>, true);
  const contributor = useNodeJsContributorsApi(isVisible);

  return (
    <div ref={ref} className="random-contributor">
      {!contributor && isVisible && <AnimatedPlaceholder />}
      {contributor && (
        <>
          <div className="random-contributor__avatar">
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
          <div className="random-contributor__thank">
            <FormattedMessage id="components.randomContributor.thankYou" />
            <a
              href={contributor.profileUri}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              {contributor.login}
            </a>
            <FormattedMessage id="components.randomContributor.forBeing" />
            <a
              href={contributor.commitsListUri}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <FormattedMessage
                id="components.randomContributor.contributionAmount"
                values={{ amount: contributor.contributionsCount }}
                tagName="span"
              />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default RandomContributor;
