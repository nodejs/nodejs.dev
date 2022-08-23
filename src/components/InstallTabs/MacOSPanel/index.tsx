import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import useNvmVersion from '../../../hooks/useNvmVersion';
import ShellBox from '../../ShellBox';
import '../InstallTabs.scss';

interface Props {
  nvmVersion: string;
}

export const PureMacOSPanel = ({ nvmVersion }: Props): JSX.Element => {
  const nvmInstallScriptUrl = `https://raw.githubusercontent.com/nvm-sh/nvm/${nvmVersion}/install.sh`;

  return (
    <div>
      <ShellBox textToCopy={`curl -o- ${nvmInstallScriptUrl} | bash`}>
        <span className="install__text__no-select">$</span>
        <span className="install__text__command">curl -o- </span>
        {nvmInstallScriptUrl}
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
        <FormattedMessage id="components.installTabs.readDocs" />
      </Link>
    </div>
  );
};

const MacOSPanel = (): JSX.Element => {
  const nvmVersion = useNvmVersion();

  return <PureMacOSPanel nvmVersion={nvmVersion} />;
};

export default MacOSPanel;
