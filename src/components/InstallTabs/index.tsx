import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './InstallTabs.scss';
import { Link } from 'gatsby';

const InstallTabs = (): JSX.Element => {
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
        <Tab>nvm (Linux)</Tab>
        <Tab>nvm (macOS)</Tab>
        <Tab>Chocolatey (Windows)</Tab>
        <Tab>apt-get (Debian)</Tab>
      </TabList>

      <TabPanel>
        <div>
          <code className="install__text">
            <div className="install__text__line">
              <span className="install__text__no-select">$</span>apk add -U curl
              bash ca-certificates openssl ncurses coreutils python2 make gcc
              g++ libgcc linux-headers grep util-linux binutils findutils
            </div>
            <div className="install__text__line">
              <span className="install__text__no-select">$</span>curl -o-
              https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh |
              bash
            </div>
            <div className="install__text__line">
              <span className="install__text__no-select">$</span>
              nvm install --lts
            </div>
          </code>
          <br />
          <br />
          {/* TODO when the new docs page is ready link to that page.  */}
          <button type="button" className="install__docs-button">
            <a
              className="install__docs-button-text"
              href="https://nodejs.org/en/download/package-manager/#nvm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read documentation
            </a>
          </button>
        </div>
      </TabPanel>
      <TabPanel>
        <div>
          <code className="install__text">
            <div className="install__text__line">
              <span className="install__text__no-select">$</span>curl -o-
              https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh |
              bash
            </div>
            <div className="install__text__line">
              <span className="install__text__no-select">$</span>nvm install
              --lts
            </div>
          </code>
          <br />
          <br />
          <button type="button" className="install__docs-button">
            <a
              className="install__docs-button-text"
              href="https://nodejs.org/en/download/package-manager/#nvm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read documentation
            </a>
          </button>
        </div>
      </TabPanel>
      <TabPanel>
        <div>
          <code className="install__text">
            <div className="install__text__line">
              <span className="install__text__no-select">$</span>choco install
              nodejs-lts
            </div>
          </code>
          <br />
          <br />
          <button type="button" className="install__docs-button">
            <a
              className="install__docs-button-text"
              href="https://nodejs.org/en/download/package-manager/#windows"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read documentation
            </a>
          </button>
        </div>
      </TabPanel>
      <TabPanel>
        <div>
          <code className="install__text">
            <div className="install__text__line">
              <span className="install__text__no-select">$</span>curl -sL
              https://deb.nodesource.com/setup_12.x | sudo -E bash -
            </div>
            <div className="install__text__line">
              <span className="install__text__no-select">$</span>sudo apt-get
              install nodejs
            </div>
          </code>
          <br />
          <br />
          <button type="button" className="install__docs-button">
            <a
              className="install__docs-button-text"
              href="https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read documentation
            </a>
          </button>
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default InstallTabs;
