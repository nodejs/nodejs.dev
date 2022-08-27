import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NodeReleaseLTSNPMVersion } from '../../types';
import './DownloadHeader.scss';

type Props = { release?: NodeReleaseLTSNPMVersion };

const DownloadHeader = ({ release }: Props): JSX.Element => {
  const nodeVersion = release?.version;
  const npmVersion = release?.npm;
  const lts = !!release?.lts;

  return (
    <>
      <div className="download-page__navigation">
        <div>
          HOME /{' '}
          <span className="download-page__navigation--active">
            <FormattedMessage id="components.downloadHeader.navigation.activeSection" />
          </span>
        </div>
        <div>
          <FormattedMessage
            id="components.downloadHeader.navigation.nodeVersion"
            values={{ lts, nodeVersion }}
          />
        </div>
      </div>
      <div className="download-page__navigation">
        <div className="download-page__navigation--title">
          <FormattedMessage id="components.downloadHeader.navigation.title" />
        </div>
        <div className="download-page__navigation--npm">
          <FormattedMessage
            id="components.downloadHeader.navigation.npmVersion"
            values={{ npmVersion }}
          />
        </div>
      </div>
    </>
  );
};

export default DownloadHeader;
