import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { detectOS, UserOS } from '../../util/detectOS';
import './InstallTabs.scss';

import WindowsPanel from './WindowsPanel';
import MacOSPanel from './MacOSPanel';
import LinuxPanel from './LinuxPanel';

const InstallTabs = (): JSX.Element => {
  const userOS = detectOS();

  const systems = {
    WIN: ['Chocolatey (Windows)', 'nvm (macOS)', 'nvm (Linux)'],
    MAC: ['nvm (macOS)', 'Chocolatey (Windows)', 'nvm (Linux)'],
    LINUX: ['nvm (Linux)', 'nvm (macOS)', 'Chocolatey (Windows)'],
    UNKNOWN: ['Chocolatey (Windows)', 'nvm (macOS)', 'nvm (Linux)'],
    // MOBILE: ['Chocolatey (Windows)', 'nvm (macOS)', 'nvm (Linux)'],
  };

  function panelSwitch(): JSX.Element {
    switch (userOS) {
      default:
        return (
          <>
            <TabPanel>
              <WindowsPanel />
            </TabPanel>
            <TabPanel>
              <MacOSPanel />
            </TabPanel>
            <TabPanel>
              <LinuxPanel />
            </TabPanel>
          </>
        );
      case UserOS.MAC:
        return (
          <>
            <TabPanel>
              <MacOSPanel />
            </TabPanel>
            <TabPanel>
              <WindowsPanel />
            </TabPanel>
            <TabPanel>
              <LinuxPanel />
            </TabPanel>
          </>
        );
      case UserOS.LINUX:
        return (
          <>
            <TabPanel>
              <LinuxPanel />
            </TabPanel>
            <TabPanel>
              <MacOSPanel />
            </TabPanel>
            <TabPanel>
              <WindowsPanel />
            </TabPanel>
          </>
        );
    }
  }

  // if userOS doesn't match for some reason, return an empty element
  if (systems[userOS] === undefined) {
    return <></>;
  }

  return (
    <Tabs>
      <div className="install__header">
        <div className="install__header-circles">
          <div className="install__header-grey-circle" />
          <div className="install__header-grey-circle" />
          <div className="install__header-grey-circle" />
        </div>
        <div className="install__header-text">bash</div>
      </div>
      <TabList>
        {systems[userOS].map((system: string) => (
          <Tab key={system.toString()}>{system}</Tab>
        ))}
      </TabList>
      )}
      {panelSwitch()}
    </Tabs>
  );
};

export default InstallTabs;
