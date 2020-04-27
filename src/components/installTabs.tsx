import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../styles/install-tabs.scss';
import { Link } from 'gatsby';

const InstallTabs = (): JSX.Element => {
  return (
    <Tabs>
      <TabList>
        <Tab>Mac OS</Tab>
        <Tab>Windows</Tab>
        <Tab>Ubuntu / Debian</Tab>
      </TabList>

      <TabPanel>
        <div>
          Download the <Link to="/download">macOS Installer</Link> directly from
          the nodejs.org web site.
          <h2>Alternatives</h2>
          <p>
            Using
            <a href="https://brew.sh" target="_blank" rel="noopener noreferrer">
              Homebrew
            </a>
          </p>
          <code>brew install node</code>
          <p>
            Using
            <a
              href="https://www.macports.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Macports
            </a>
          </p>
          <code>port install nodejs14</code>
        </div>
      </TabPanel>
      <TabPanel>
        <div>
          <p>
            Download the <Link to="/download">Windows Installer</Link> directly
            from the nodejs.org web site.
          </p>
          <h2>Alternatives</h2>
          <p> Using Chocolatey:</p>
          <code>
            cinst nodejs # or for full install with npm cinst nodejs.install
            Using Scoop: scoop install nodejs
          </code>
        </div>
      </TabPanel>
      <TabPanel>
        <div>
          <h2>
            Debian and Ubuntu based Linux distributions, Enterprise Linux/Fedora
            and Snap packages
          </h2>
          <p>
            <a href="https://github.com/nodesource/distributions/blob/master/README.md">
              Node.js binary distributions
            </a>
            are available from NodeSource.
          </p>
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default InstallTabs;
