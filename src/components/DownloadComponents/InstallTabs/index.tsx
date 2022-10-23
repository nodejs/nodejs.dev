import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { detectOS, UserOS } from '../../../util/detectOS';
import WindowsPanel from './WindowsPanel';
import MacOSPanel from './MacOSPanel';
import LinuxPanel from './LinuxPanel';
import styles from './index.module.scss';

const getOSPanel = (userOS: UserOS): JSX.Element => {
  switch (userOS) {
    case UserOS.MAC:
      return (
        <>
          <TabPanel
            className={styles.reactTabsTabPanel}
            selectedClassName={styles.reactTabsTabPanelSelected}
          >
            <MacOSPanel />
          </TabPanel>
          <TabPanel
            className={styles.reactTabsTabPanel}
            selectedClassName={styles.reactTabsTabPanelSelected}
          >
            <WindowsPanel />
          </TabPanel>
          <TabPanel
            className={styles.reactTabsTabPanel}
            selectedClassName={styles.reactTabsTabPanelSelected}
          >
            <LinuxPanel />
          </TabPanel>
        </>
      );
    case UserOS.LINUX:
    case UserOS.UNIX:
      return (
        <>
          <TabPanel
            className={styles.reactTabsTabPanel}
            selectedClassName={styles.reactTabsTabPanelSelected}
          >
            <LinuxPanel />
          </TabPanel>
          <TabPanel
            className={styles.reactTabsTabPanel}
            selectedClassName={styles.reactTabsTabPanelSelected}
          >
            <MacOSPanel />
          </TabPanel>
          <TabPanel
            className={styles.reactTabsTabPanel}
            selectedClassName={styles.reactTabsTabPanelSelected}
          >
            <WindowsPanel />
          </TabPanel>
        </>
      );
    default:
      return (
        <>
          <TabPanel
            className={styles.reactTabsTabPanel}
            selectedClassName={styles.reactTabsTabPanelSelected}
          >
            <WindowsPanel />
          </TabPanel>
          <TabPanel
            className={styles.reactTabsTabPanel}
            selectedClassName={styles.reactTabsTabPanelSelected}
          >
            <MacOSPanel />
          </TabPanel>
          <TabPanel
            className={styles.reactTabsTabPanel}
            selectedClassName={styles.reactTabsTabPanelSelected}
          >
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

const installTabSystems: Record<UserOS, string[]> = {
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

    // This component should be rendered within the client-side only.
    setReactTabs(
      <Tabs className={styles.reactTabs}>
        <div className={styles.installHeader}>
          <div className={styles.installHeaderCircles}>
            <div className={styles.installHeaderGreyCircle} />
            <div className={styles.installHeaderGreyCircle} />
            <div className={styles.installHeaderGreyCircle} />
          </div>
          <div className={styles.installHeaderText}>
            {userOS === 'MAC' ? 'zsh' : 'bash'}
          </div>
        </div>
        <TabList className={styles.reactTabsTabList}>
          {tabLayout.map(system => (
            <Tab
              className={styles.reactTabsTab}
              selectedClassName={styles.reactTabsTabSelected}
              key={system}
            >
              {system}
            </Tab>
          ))}
        </TabList>
        {tabLayout && panelSwitch}
      </Tabs>
    );
  }, []);

  return <div className={styles.install}>{reactTabs}</div>;
};

export default InstallTabs;
