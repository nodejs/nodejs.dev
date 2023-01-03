import React from 'react';
import { FormattedMessage } from 'react-intl';
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
  const Released = alreadyReleased ? <FormattedMessage id="components.UpcomingReleasesItem" /> : '';

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
        {Released} {releaseDate}
      </p>
    </div>
  );
};

export default UpcomingReleasesItem;
