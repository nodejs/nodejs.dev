import React, { useMemo } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { UserOS } from '../../util/detectOS';
import { useDetectOs } from '../../hooks/useDetectOs';
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

const InstallTabs = (): JSX.Element | null => {
  const { userOS } = useDetectOs();

  const os = {
    win: 'Windows (Chocolatey)',
    mac: 'macOS (nvm)',
    linux: 'Linux (nvm)',
  };

  const installTabSystems = {
    WIN: [os.win, os.mac, os.linux],
    MAC: [os.mac, os.win, os.linux],
    LINUX: [os.linux, os.mac, os.win],
    UNIX: [os.linux, os.mac, os.win],
    UNKNOWN: [os.win, os.mac, os.linux],
  };

  const panelSwitch = useMemo(() => getOSPanel(userOS), [userOS]);

  return (
    <div className="install">
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
          {installTabSystems[userOS]?.map((system: string) => (
            <Tab key={system.toString()}>{system}</Tab>
          ))}
        </TabList>
        {installTabSystems[userOS] && panelSwitch}
      </Tabs>
    </div>
  );
};

export default InstallTabs;
