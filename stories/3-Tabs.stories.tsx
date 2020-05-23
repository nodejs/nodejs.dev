import React from 'react';
import InstallTabs from '../src/components/InstallTabs';
import '../src/components/InstallTabs/InstallTabs.scss';

export default {
  title: 'InstallTabs',
  component: InstallTabs,
};
const Tabs = '#';

export const withButton = (): JSX.Element => (
  <div className="InstallTabs">
    <p>MacOS</p>
  </div>
);
