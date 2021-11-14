import { Link } from 'gatsby';
import React from 'react';
import ShellBox from '../../ShellBox';
import useNvmVersion from '../../../hooks/useNvmVersion';
import '../InstallTabs.scss';

const MacOSPanel = (): JSX.Element => {
  const asyncState = useNvmVersion();

  if (asyncState.state === 'loading') {
    return <em>Loading...</em>;
  }

  if (asyncState.state === 'error') {
    return <em>Error loading. Try refreshing the page.</em>;
  }

  const { nvmVersion } = asyncState;

  return (
    <div>
      <ShellBox
        textToCopy={`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/${nvmVersion}/install.sh | bash`}
      >
        <span className="install__text__no-select">$</span>
        <span className="install__text__command">curl -o- </span>
        {`https://raw.githubusercontent.com/nvm-sh/nvm/${nvmVersion}/install.sh`}
        <span className="install__text__command"> | bash </span>
      </ShellBox>
      <ShellBox textToCopy="nvm install --lts">
        <span className="install__text__no-select">$</span>
        <span className="install__text__command">nvm </span>install --lts
      </ShellBox>
      <br />
      <br />
      <Link
        className="install__docs-button"
        to="/download/package-manager/#nvm"
      >
        Read documentation
      </Link>
    </div>
  );
};

export default MacOSPanel;
