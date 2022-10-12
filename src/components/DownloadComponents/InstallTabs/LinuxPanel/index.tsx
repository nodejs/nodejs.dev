import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import useNvmVersion from '../../../../hooks/useNvmVersion';
import { ShellBox } from '../../../CommonComponents';
import styles from '../index.module.scss';

interface Props {
  nvmVersion: string;
}

export const PureLinuxPanel = ({ nvmVersion }: Props): JSX.Element => {
  const nvmInstallScriptUrl = `https://raw.githubusercontent.com/nvm-sh/nvm/${nvmVersion}/install.sh`;

  return (
    <div>
      <ShellBox textToCopy={`curl -o- ${nvmInstallScriptUrl} | bash`}>
        <span className={styles.installTextNoSelect}>$</span>
        <span className={styles.installTextCommand}>curl -o- </span>
        {nvmInstallScriptUrl}
        <span className={styles.installTextCommand}> | bash</span>
      </ShellBox>
      <ShellBox textToCopy="nvm install --lts">
        <span className={styles.installTextNoSelect}>$</span>
        <span className={styles.installTextCommand}>nvm</span> install --lts
      </ShellBox>
      <Link
        className={styles.installDocsButton}
        to="/download/package-manager/#nvm"
      >
        <FormattedMessage id="components.installTabs.readDocs" />
      </Link>
    </div>
  );
};

const LinuxPanel = (): JSX.Element => {
  const nvmVersion = useNvmVersion();

  return <PureLinuxPanel nvmVersion={nvmVersion} />;
};

export default LinuxPanel;
