import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { detectOS, UserOS } from '../../util/detectOS';
import './InstallTabs.scss';

import WindowsPanel from './WindowsPanel';
import MacOSPanel from './MacOSPanel';
import LinuxPanel from './LinuxPanel';

const InstallTabs = (): JSX.Element => {
  const userOS = detectOS();

  let OSTabOrder = ['Chocolatey (Windows)', 'nvm (macOS)', 'nvm (Linux)'];
  if (userOS === UserOS.WIN) {
    OSTabOrder = ['Chocolatey (Windows)', 'nvm (macOS)', 'nvm (Linux)'];
  } else if (userOS === UserOS.MAC) {
    OSTabOrder = ['nvm (macOS)', 'Chocolatey (Windows)', 'nvm (Linux)'];
  } else if (userOS === UserOS.LINUX) {
    OSTabOrder = ['nvm (Linux)', 'nvm (macOS)', 'Chocolatey (Windows)'];
  }

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
        <Tab>{OSTabOrder[0]}</Tab>
        <Tab>{OSTabOrder[1]}</Tab>
        <Tab>{OSTabOrder[2]}</Tab>
      </TabList>
      {panelSwitch(userOS)}
    </Tabs>
  );
};

export default InstallTabs;
