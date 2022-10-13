import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import UpcomingReleasesPanel from './UpcomingReleasesPanel';
import { UpcomingRelease } from '../../../types';
import styles from './index.module.scss';

interface Props {
  upcomingReleases: UpcomingRelease[];
}

const UpcomingReleases = ({ upcomingReleases }: Props): JSX.Element => (
  <div className={styles.upcomingReleases}>
    <Tabs className={styles.reactTabs}>
      <TabList className={styles.reactTabsTabList}>
        {upcomingReleases.map(release => (
          <Tab
            key={release.title}
            className={styles.reactTabsTab}
            selectedClassName={styles.reactTabsTabSelected}
          >
            Node.js {release.title}
          </Tab>
        ))}
      </TabList>
      {upcomingReleases.map(release => (
        <TabPanel
          key={release.title}
          className={styles.reactTabsTabPanel}
          selectedClassName={styles.reactTabsTabPanelSelected}
        >
          <UpcomingReleasesPanel releases={release.releases} />
        </TabPanel>
      ))}
    </Tabs>
  </div>
);

export default UpcomingReleases;
