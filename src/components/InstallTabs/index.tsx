import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { detectOS, UserOS } from '../../util/detectOS';
import WindowsPanel from './WindowsPanel';
import MacOSPanel from './MacOSPanel';
import LinuxPanel from './LinuxPanel';

import './InstallTabs.scss';

const getOSPanel = (userOS: UserOS): JSX.Element => {
  switch (userOS) {
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
    case UserOS.UNIX:
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
  }
};

const os = {
  win: 'Windows (Chocolatey)',
  mac: 'macOS (nvm)',
  linux: 'Linux (nvm)',
};

const installTabSystems: Record<UserOS, Array<string>> = {
  WIN: [os.win, os.mac, os.linux],
  MAC: [os.mac, os.win, os.linux],
  LINUX: [os.linux, os.mac, os.win],
  UNIX: [os.linux, os.mac, os.win],
  UNKNOWN: [os.win, os.mac, os.linux],
  MOBILE: [os.win, os.mac, os.linux],
};

const InstallTabs = (): JSX.Element | null => {
  const [reactTabs, setReactTabs] = useState<React.ReactNode>();

  useEffect(() => {
    const userOS = detectOS();
    const panelSwitch = getOSPanel(userOS);
    const tabLayout = installTabSystems[userOS];

    // This component should be rendered within the client-side onlyn
    setReactTabs(
      <Tabs environment={undefined}>
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
          {tabLayout.map(system => (
            <Tab key={system}>{system}</Tab>
          ))}
        </TabList>
        {tabLayout && panelSwitch}
      </Tabs>
    );
  }, []);

  return <div className="install">{reactTabs}</div>;
};

export default InstallTabs;
