import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ReleaseData } from '../../hooks/useReleaseHistory';
import DownloadTable from './DownloadTable';
import hexagonFilled from '../../images/icons/hexagon-filled.svg';
import hexagonOutline from '../../images/icons/hexagon-outline.svg';
import './DownloadReleases.scss';

interface Props {
  releases: ReleaseData[];
}

export default function DownloadToggle({ releases }: Props): JSX.Element {
  return (
    <div className="download-releases">
      <h2 className="download-releases__title">Upcoming Releases</h2>
      <Tabs>
        <TabList>
          <Tab>Node.js 12</Tab>
          <Tab>Node.js 13</Tab>
          <Tab>Node.js 14</Tab>
          <Tab>Node.js 15</Tab>
        </TabList>
        <TabPanel>
          <div className="node">
            <div className="current">
              <img src={hexagonFilled} alt="" />

              <p className="release-title">Current</p>
              <p className="release-date">Released 2019-04-23</p>
            </div>
            <div className="lts">
              <img src={hexagonFilled} alt="" />
              <p className="release-title">Active LTS</p>
              <p className="release-date">Released 2019-10-21</p>
            </div>
            <div className="maintenance">
              <img src={hexagonOutline} alt="" />
              <p className="release-title">Maintenance Release</p>
              <p className="release-date">Released 2020-10-20 </p>
            </div>
            <div className="endoflife">
              <img src={hexagonOutline} alt="" />
              <p className="release-title">End-of-life Release</p>
              <p className="release-date">Released 2022-04-30</p>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="node">
            <div className="current">
              <img src={hexagonFilled} alt="" />
              <p className="release-title">Current</p>
              <p className="release-date">Released 2019-10-22</p>
            </div>
            <div className="maintenance">
              <img src={hexagonFilled} alt="" />
              <p className="release-title">Maintenance Release</p>
              <p className="release-date">Released 2020-04-01 </p>
            </div>
            <div className="endoflife">
              <img src={hexagonOutline} alt="" />
              <p className="release-title">End-of-life Release</p>
              <p className="release-date">Released 2020-06-01</p>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="node">
            <div className="current">
              <img src={hexagonFilled} alt="" />

              <p className="release-title">Current</p>
              <p className="release-date">Released 2020-04-21</p>
            </div>
            <div className="lts">
              <img src={hexagonOutline} alt="" />
              <p className="release-title">Active LTS</p>
              <p className="release-date">Released 2020-10-20</p>
            </div>
            <div className="maintenance">
              <img src={hexagonOutline} alt="" />
              <p className="release-title">Maintenance Release</p>
              <p className="release-date">Release 2021-10-19</p>
            </div>
            <div className="endoflife">
              <img src={hexagonOutline} alt="" />
              <p className="release-title">End-of-life Release</p>
              <p className="release-date">Release 2023-04-30</p>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="node">
            <div className="current">
              <img src={hexagonFilled} alt="" />

              <p className="release-title">Current</p>
              <p className="release-date">Released 2020-10-21 </p>
            </div>
            <div className="maintenance">
              <img src={hexagonOutline} alt="" />
              <p className="release-title">Maintenance Release</p>
              <p className="release-date">Release 2021-04-01</p>
            </div>
            <div className="endoflife">
              <img src={hexagonOutline} alt="" />
              <p className="release-title">End-of-life Release</p>
              <p className="release-date">Release 2021-06-01</p>
            </div>
          </div>
        </TabPanel>
      </Tabs>
      <p className="lts__text">
        Major Node.js versions enter Current release status for six months,
        which gives library authors time to add support for them. After six
        months, odd-numbered releases (9, 11, etc.) become unsupported, and
        even-numbered releases (10, 12, etc.) move to Active LTS status and are
        ready for general use. LTS release status is &quot;long-term
        support&quot;, which typically guarantees that critical bugs will be
        fixed for a total of 30 months. Production applications should only use
        Active LTS or Maintenance LTS releases.
      </p>
      <DownloadTable releases={releases} />
    </div>
  );
}
