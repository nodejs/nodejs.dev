import React from 'react';
import ShellBox from '../../ShellBox';
import '../InstallTabs.scss';

const MacOSPanel = (): JSX.Element => {
  return (
    <div>
      <ShellBox textToCopy="curl -o- | bash https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh">
        <span className="install__text__no-select">$</span>
        <span className="install__text__command">curl -o- | bash </span>
        https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh
      </ShellBox>
      <ShellBox textToCopy="nvm install --lts">
        <span className="install__text__no-select">$</span>
        <span className="install__text__command">nvm </span>install --lts
      </ShellBox>
      <br />
      <br />
      <a
        className="install__docs-link"
        href="https://nodejs.org/en/download/package-manager/#nvm"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read documentation
      </a>
    </div>
  );
};

export default MacOSPanel;
