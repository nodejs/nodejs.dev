import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import styles from './index.module.scss';

interface Props {
  index: number;
  username: string;
  githubImgLink: string;
}

const Author = ({
  index,
  username,
  intl,
  githubImgLink,
}: Props & WrappedComponentProps) => {
  const githubLink = `https://github.com/${username}`;

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
        <img src={githubImgLink} alt="" />
      </a>
    </li>
  );
};

export default injectIntl(Author);
