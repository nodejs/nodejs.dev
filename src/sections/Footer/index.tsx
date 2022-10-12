import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faSlack,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import styles from './index.module.scss';

const Footer = (): JSX.Element => (
  <footer className={styles.footer}>
    <ul className={styles.left}>
      <li>
        <a
          className={styles.link}
          target="_blank"
          href="https://trademark-policy.openjsf.org/"
          rel="noopener noreferrer"
          aria-label="Node.js Trademark Policy - PDF (Opens in new tab)"
        >
          <FormattedMessage id="components.footer.links.trademark" />
        </a>
      </li>
      <li>
        <a
          className={styles.link}
          target="_blank"
          href="https://privacy-policy.openjsf.org/"
          rel="noopener noreferrer"
          aria-label="Node.js Privacy Policy - PDF (Opens in new tab)"
        >
          <FormattedMessage id="components.footer.links.privacy" />
        </a>
      </li>
      <li>
        <a
          className={styles.link}
          href="https://github.com/openjs-foundation/cross-project-council/blob/main/CODE_OF_CONDUCT.md#contributor-covenant-code-of-conduct"
        >
          <FormattedMessage id="components.footer.links.codeOfConduct" />
        </a>
      </li>
      <li>
        <Link className={styles.link} to="/about/security">
          <FormattedMessage id="components.footer.links.security" />
        </Link>
      </li>
      <li>
        <Link className={styles.link} to="/about">
          <FormattedMessage id="components.footer.links.about" />
        </Link>
      </li>
      <li>
        <Link className={styles.link} to="/blog">
          <FormattedMessage id="components.footer.links.blog" />
        </Link>
      </li>
    </ul>
    <ul className={styles.right}>
      <li>
        <FormattedMessage id="components.footer.links.openJsFoundation" />
      </li>
      <li>
        <a
          target="_blank"
          href="https://github.com/nodejs/node"
          rel="noopener noreferrer"
          aria-label="Node.js Github Page (opens in new tab)"
        >
          <FontAwesomeIcon
            icon={faGithub}
            color="var(--color-text-secondary)"
          />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://twitter.com/nodejs"
          rel="noopener noreferrer"
          aria-label="Node.js Twitter (opens in new tab)"
        >
          <FontAwesomeIcon
            icon={faTwitter}
            color="var(--color-text-secondary)"
          />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          href="https://slack.openjsf.org"
          rel="noopener noreferrer"
          aria-label="Node.js Slack (opens in new tab)"
        >
          <FontAwesomeIcon icon={faSlack} color="var(--color-text-secondary)" />
        </a>
      </li>
    </ul>
  </footer>
);

export default Footer;
