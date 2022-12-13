import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import styles from './index.module.scss';
import authorPlaceholderImg from '../../../../images/placeholder-img.png';

interface Props {
  index: number;
  username: string;
  size: string;
}

const Author = ({
  index,
  username,
  size = '64',
  intl,
}: Props & WrappedComponentProps) => {
  // Clean up username and build links.
  const githubUserName = username.trim();
  const githubLink = `https://github.com/${githubUserName}`;
  const githubImgLink = `https://github.com/${githubUserName}.png?size=${size}`;
  
  const authorImg = {
    backgroundImage: `url(${githubImgLink}), url(${authorPlaceholderImg})`,
  };

  // If it's the first author then no margin left.
  const mleft = index === 0 ? { marginLeft: 0 } : {};

  const translation = intl.formatMessage(
    { id: 'components.author.githubLinkLabel' },
    { username }
  );

  return (
    <li>
      <a
        className={styles.link}
        href={githubLink}
        aria-label={translation}
        key={username}
        target="_blank"
        rel="noopener noreferrer"
        style={mleft}
      >
        <span
          style={authorImg}
        />
      </a>
    </li>
  );
};

export default injectIntl(Author);
