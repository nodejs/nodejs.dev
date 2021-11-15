import React from 'react';
import classnames from 'classnames';
import { ReactComponent as HexagonFilled } from '../../../images/icons/hexagon-filled.svg';
import { ReactComponent as HexagonOutline } from '../../../images/icons/hexagon-outline.svg';
import { UpcomingReleaseData } from '../../../types';
import './UpcomingReleasesItem.scss';

type Props = UpcomingReleaseData;

export default function UpcomingReleasesItem({
  releaseType,
  releaseDate,
  alreadyReleased,
}: Props): JSX.Element {
  const Image = alreadyReleased ? HexagonFilled : HexagonOutline;
  const className = classnames(`upcoming-releases__item--${releaseType}`, {
    'upcoming-releases__item--to-be-released': !alreadyReleased,
  });

  return (
    <div className={className}>
      <Image />
      <p className="release-title">{releaseType}</p>
      <p className="release-date">
        {alreadyReleased ? 'Released' : ''} {releaseDate}
      </p>
    </div>
  );
}
