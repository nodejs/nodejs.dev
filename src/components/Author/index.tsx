import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import styles from './index.module.scss';

interface Props {
  index: number;
  username: string;
  size: string;
}

const Author = ({
  index,
  username,
  size = '64',
}: Props): null | JSX.Element => {
  const intl = useIntl();

  const translate = defineMessages({
    ariaLabel: {
      id: 'components.author.githubLinkLabel',
    },
  });
  if (username) {
    // Clean up username and build links.
    const githubUserName = username.trim();
    const githubLink = `https://github.com/${githubUserName}`;
    const githubImgLink = `https://github.com/${githubUserName}.png?size=${size}`;

    // If it's the first author then no margin left.
    const mleft = index === 0 ? { marginLeft: 0 } : {};

    return (
      <li>
        <a
          className={styles.link}
          href={githubLink}
          aria-label={intl.formatMessage(translate.ariaLabel, {
            username,
          })}
          key={username}
          target="_blank"
          rel="noopener noreferrer"
          style={mleft}
        >
          <img src={githubImgLink} alt="" />
        </a>
      </li>
    );
  }

  return null;
};

export default Author;
