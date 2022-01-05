import { Link } from 'gatsby';
import React from 'react';
import ShellBox from '../../ShellBox';
import '../InstallTabs.scss';

interface Props {
  nvmVersion: string;
}

const LinuxPanel = ({ nvmVersion }: Props): JSX.Element => {
  const nvmInstallScriptUrl = `https://raw.githubusercontent.com/nvm-sh/nvm/${nvmVersion}/install.sh`;

  return (
    <div>
      <ShellBox textToCopy={`curl -o- ${nvmInstallScriptUrl} | bash`}>
        <span className="install__text__no-select">$</span>
        <span className="install__text__command"> curl -o- </span>
        {nvmInstallScriptUrl}
        <span className="install__text__command"> | bash</span>
      </ShellBox>
      <ShellBox textToCopy="nvm install --lts">
        <span className="install__text__no-select">$</span>
        <span className="install__text__command"> nvm</span> install --lts
      </ShellBox>
      <Link
        className="install__docs-button"
        to="/download/package-manager/#nvm"
      >
        Read documentation
      </Link>
    </div>
  );
};

export default LinuxPanel;
