import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import ShellBox from '../../ShellBox';
import '../InstallTabs.scss';

const WindowsPanel = (): JSX.Element => {
  return (
    <div>
      <ShellBox textToCopy="choco install nvs">
        <span className="install__text__no-select">$</span>
        <span className="install__text__command">choco </span>install nvs
      </ShellBox>
      <ShellBox textToCopy="nvs add lts">
        <span className="install__text__no-select">$</span>
        <span className="install__text__command">nvs </span>add lts
      </ShellBox>
      <ShellBox textToCopy="nvs use lts">
        <span className="install__text__no-select">$</span>
        <span className="install__text__command">nvs </span>use lts
      </ShellBox>
      <br />
      <br />
      <Link
        className="install__docs-button"
        to="/download/package-manager/#nvs"
      >
        <FormattedMessage id="components.installTabs.readDocs" />
      </Link>
    </div>
  );
};

export default WindowsPanel;
