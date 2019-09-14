import { css, SerializedStyles } from '@emotion/core';
import React from 'react';

const list: SerializedStyles = css`
  list-style: none;
`;

const link: SerializedStyles = css`
  margin-left: 0.5rem;

  &:hover img {
    transform: scale(1.1);
  }
`;

const img: SerializedStyles = css`
  height: 30px;
  width: 30px;
  margin-top: 5px;
  border-radius: 100%;
  border: 1px solid var(--brand-light);
  transition: all 0.2s ease-in-out;
`;

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
  if (!username) {
    return null;
  }

  // Clean up username and build links.
  const githubUserName = username.trim();
  const githubLink = `https://github.com/${githubUserName}`;
  const githubImgLink = `https://github.com/${githubUserName}.png?size=${size}`;

  // If it's the first author then no margin left.
  const mleft = index === 0 ? { marginLeft: 0 } : {};

  return (
    <li css={list}>
      <a
        css={link}
        href={githubLink}
        title={username}
        key={username}
        target="_blank"
        rel="noopener noreferrer"
        style={mleft}
      >
        <img
          css={img}
          className="author-img"
          src={githubImgLink}
          alt={username}
        />
      </a>
    </li>
  );
};

export default Author;
