import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { ShellBox } from '../../../CommonComponents';
import styles from '../index.module.scss';

const WindowsPanel = (): JSX.Element => (
  <div>
    <ShellBox textToCopy="choco install nvs">
      <span className={styles.installTextNoSelect}>$</span>
      <span className={styles.installTextCommand}>choco </span>install nvs
    </ShellBox>
    <ShellBox textToCopy="nvs add lts">
      <span className={styles.installTextNoSelect}>$</span>
      <span className={styles.installTextCommand}>nvs </span>add lts
    </ShellBox>
    <ShellBox textToCopy="nvs use lts">
      <span className={styles.installTextNoSelect}>$</span>
      <span className={styles.installTextCommand}>nvs </span>use lts
    </ShellBox>
    <br />
    <br />
    <Link
      className={styles.installDocsButton}
      to="/download/package-manager/#nvs"
    >
      <FormattedMessage id="components.installTabs.readDocs" />
    </Link>
  </div>
);

export default WindowsPanel;
