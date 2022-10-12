import React from 'react';
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps,
} from 'react-intl';
import { NodeReleaseData } from '../../../types';
import { SectionTitle } from '../../CommonComponents';
import styles from './index.module.scss';

interface Props {
  release?: NodeReleaseData;
}

const DownloadHeader = ({ release, intl }: Props & WrappedComponentProps) => (
  <>
    <div className={styles.downloadHeader}>
      <SectionTitle
        path={[
          'home',
          intl.formatMessage({
            id: 'components.downloadHeader.navigation.activeSection',
          }),
        ]}
      />
      <div>
        <FormattedMessage
          id="components.downloadHeader.navigation.nodeVersion"
          values={{ lts: release?.isLts, nodeVersion: release?.fullVersion }}
        />
      </div>
    </div>
    <div className={styles.downloadHeader}>
      <div className={styles.title}>
        <FormattedMessage id="components.downloadHeader.navigation.title" />
      </div>
      <div className={styles.npm}>
        <FormattedMessage id="components.downloadHeader.navigation.npmVersion" />
      </div>
    </div>
  </>
);

export default injectIntl(DownloadHeader);
