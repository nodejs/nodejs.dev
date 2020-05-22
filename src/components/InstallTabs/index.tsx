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
            <span className="install__text__no-select">$</span>nvm install node
          </code>
          <br />
          <br />
          <div>
            Download the <Link to="/download">Linux installer</Link> directly
            from the{' '}
            <a
              href="https://nodejs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              nodejs.org
            </a>{' '}
            website.
          </div>
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
            <span className="install__text__no-select">$</span>nvm install node
          </code>
          <br />
          <br />
          <div>
            Download the <Link to="/download">macOS installer</Link> directly
            from the{' '}
            <a
              href="https://nodejs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              nodejs.org
            </a>{' '}
            website.
          </div>
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
            <span className="install__text__no-select">$</span>cinst nodejs
          </code>
          <br />
          <br />
          <div>
            Download the <Link to="/download">Windows installer</Link> directly
            from the{' '}
            <a
              href="https://nodejs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              nodejs.org
            </a>{' '}
            website.
          </div>
          <br />
          <h4>Alternative</h4>
          <div>
            <code className="install__comments">
              # Using{' '}
              <a
                href="https://scoop.sh/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Scoopy
              </a>
            </code>
            <br />
            <code className="install__text">
              <span className="install__text__no-select">$</span>scoop install
              nodejs
            </code>
          </div>
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
            <span className="install__text__no-select">$</span>sudo apt-get
            install nodejs
          </code>
          <br />
          <br />
          <div>
            <a href="https://github.com/nodesource/distributions/blob/master/README.md">
              Node.js binary distributions
            </a>{' '}
            are available from NodeSource.
          </div>
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
