import React from 'react';
import ShellBox from '../../ShellBox';
import '../InstallTabs.scss';

const LinuxPanel = (): JSX.Element => {
  return (
    <div>
      <ShellBox
        textToCopy="apk add -U curl
bash ca-certificates openssl ncurses coreutils python2 make gcc
g++ libgcc linux-headers grep util-linux binutils findutils"
      >
        <span className="install__text__no-select">$</span>
        <span className="install__text__command">apk add -U</span> curl bash
        ca-certificates openssl ncurses coreutils python2 make gcc g++ libgcc
        linux-headers grep util-linux binutils findutils
      </ShellBox>
      <ShellBox textToCopy="curl -o- | bash https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh">
        <span className="install__text__no-select">$</span>
        <span className="install__text__command"> curl -o- | bash </span>
        https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh
      </ShellBox>
      <ShellBox textToCopy="nvm install --lts">
        <span className="install__text__no-select">$</span>
        <span className="install__text__command"> nvm</span> install --lts
      </ShellBox>
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
  );
};

export default LinuxPanel;
