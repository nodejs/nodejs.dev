import React from 'react';
import classnames from 'classnames';
import { ReactComponent as HexagonFilled } from '../../../../images/icons/hexagon-filled.svg';
import { ReactComponent as HexagonOutline } from '../../../../images/icons/hexagon-outline.svg';
import { UpcomingReleaseData } from '../../../../types';
import styles from './index.module.scss';

type Props = UpcomingReleaseData;

const UpcomingReleasesItem = ({
  releaseType,
  releaseDate,
  alreadyReleased,
}: Props): JSX.Element => {
  const Image = alreadyReleased ? HexagonFilled : HexagonOutline;

  const className = classnames({
    [styles.itemCurrent]: releaseType === 'Current',
    [styles.itemLts]: releaseType === 'LTS',
    [styles.itemMaintenance]: releaseType === 'Maintenance',
    [styles.itemEndoflife]: releaseType === 'End-of-life',
    [styles.itemToBeReleased]: !alreadyReleased,
  });

  return (
    <div className={className}>
      <Image />
      <p className={styles.releaseTitle}>{releaseType}</p>
      <p className={styles.releaseDate}>
        {alreadyReleased ? 'Released' : ''} {releaseDate}
      </p>
    </div>
  );
};

export default UpcomingReleasesItem;
