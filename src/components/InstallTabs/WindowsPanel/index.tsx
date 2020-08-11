import React from 'react';
import ShellBox from '../../ShellBox';
import '../InstallTabs.scss';

const WindowsPanel = (): JSX.Element => {
  return (
    <div>
      <ShellBox textToCopy="choco install nodejs-lts">
        <span className="install__text__no-select">$</span>
        <span className="install__text__command">choco </span>install nodejs-lts
      </ShellBox>
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
  );
};

export default WindowsPanel;
