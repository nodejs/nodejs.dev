import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import UpcomingReleasesPanel from './UpcomingReleasesPanel';
import './UpcomingReleases.scss';
import { useUpcomingReleases } from '../../hooks/useUpcomingReleases';

export default function UpcomingReleases(): JSX.Element {
  const upcomingReleaseData = useUpcomingReleases();
  return (
    <div className="upcoming-releases">
      <Tabs>
        <TabList>
          {upcomingReleaseData.map(release => (
            <Tab key={release.title}>Node.js {release.title}</Tab>
          ))}
        </TabList>
        {upcomingReleaseData.map(release => (
          <TabPanel key={release.title}>
            <UpcomingReleasesPanel releases={release.releases} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
