import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './index.module.scss';

interface Props {
  stability: number;
}

const getStabilityClass = (stability: number) => {
  switch (stability) {
    case 0:
      return styles.stabilityLevel0;
    case 1:
      return styles.stabilityLevel1;
    case 2:
      return styles.stabilityLevel2;
    default:
      return styles.stabilityLevel3;
  }
};

const Stability = ({ stability }: Props) => {
  return (
    <div className={`${styles.stability} ${getStabilityClass(stability)}`}>
      <FormattedMessage id="docs.api.stability" values={{ stability }} />
    </div>
  );
};

export default Stability;
