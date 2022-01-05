import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { detectOS, UserOS } from '../../util/detectOS';
import './InstallTabs.scss';

import WindowsPanel from './WindowsPanel';
import MacOSPanel from './MacOSPanel';
import LinuxPanel from './LinuxPanel';

interface Props {
  nvmVersion: string;
}

const InstallTabs = ({ nvmVersion }: Props): JSX.Element | null => {
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
    UNIX: [os.linux, os.mac, os.win],
    UNKNOWN: [os.win, os.mac, os.linux],
  };

  function panelSwitch(): JSX.Element {
    switch (userOS) {
      case UserOS.MAC:
        return (
          <>
            <TabPanel>
              <MacOSPanel nvmVersion={nvmVersion} />
            </TabPanel>
            <TabPanel>
              <WindowsPanel />
            </TabPanel>
            <TabPanel>
              <LinuxPanel nvmVersion={nvmVersion} />
            </TabPanel>
          </>
        );
      case UserOS.LINUX:
      case UserOS.UNIX:
        return (
          <>
            <TabPanel>
              <LinuxPanel nvmVersion={nvmVersion} />
            </TabPanel>
            <TabPanel>
              <MacOSPanel nvmVersion={nvmVersion} />
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
              <MacOSPanel nvmVersion={nvmVersion} />
            </TabPanel>
            <TabPanel>
              <LinuxPanel nvmVersion={nvmVersion} />
            </TabPanel>
          </>
        );
    }
  }

  return installTabSystems[userOS] !== undefined ? (
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
          {installTabSystems[userOS].map((system: string) => (
            <Tab key={system.toString()}>{system}</Tab>
          ))}
        </TabList>
        {panelSwitch()}
      </Tabs>
    </div>
  ) : null;
};

export default InstallTabs;
