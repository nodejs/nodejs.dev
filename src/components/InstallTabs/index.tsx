import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { detectOS, UserOS } from '../../util/detectOS';
import './InstallTabs.scss';

import WindowsPanel from './WindowsPanel';
import MacOSPanel from './MacOSPanel';
import LinuxPanel from './LinuxPanel';

const InstallTabs = (): JSX.Element => {
  const userOS = detectOS();

  const os = {
    win: 'Windows (Chocolatey)',
    mac: 'macOS (nvm)',
    linux: 'Linux (nvm)',
  };

  const installTabSystems = {
    WIN: [os.win, os.mac, os.linux],
    MAC: [os.mac, os.win, os.linux],
    LINUX: [os.linux, os.mac, os.win],
    UNKNOWN: [os.win, os.mac, os.linux],
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

  return installTabSystems[userOS] !== undefined ? (
    <Tabs>
      <div className="install__header">
        <div className="install__header-circles">
          <div className="install__header-grey-circle" />
          <div className="install__header-grey-circle" />
          <div className="install__header-grey-circle" />
        </div>
        <div className="install__header-text">
          {userOS === 'MAC' ? 'zsh' : 'bash'}
        </div>
      </div>
      <TabList>
        {installTabSystems[userOS].map((system: string) => (
          <Tab key={system.toString()}>{system}</Tab>
        ))}
      </TabList>
      {panelSwitch()}
    </Tabs>
  ) : (
    <></>
  );
};

export default InstallTabs;
