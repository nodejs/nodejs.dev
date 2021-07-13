import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import UpcomingReleasesPanel from './UpcomingReleasesPanel';
import { UpcomingRelease } from '../../types';
import './UpcomingReleases.scss';

interface Props {
  upcomingReleases: UpcomingRelease[];
}

export default function UpcomingReleases({
  upcomingReleases,
}: Props): JSX.Element {
  return (
    <div className="upcoming-releases">
      <Tabs>
        <TabList>
          {upcomingReleases.map(release => (
            <Tab key={release.title}>Node.js {release.title}</Tab>
          ))}
        </TabList>
        {upcomingReleases.map(release => (
          <TabPanel key={release.title}>
            <UpcomingReleasesPanel releases={release.releases} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
