import React from 'react';

type Props = {
  username: string;
  size: string;
};

const Author = ({ username, size = '64' }: Props) => {
  if (!username) {
    return null;
  }

  username = username.trim();
  const githubLink = `https://github.com/${username}`;
  const githubImgLink = `https://github.com/${username}.png?size=${size}`;

  return (
    <a className="author-link" href={githubLink} key={username}>
      <img className="author-img" src={githubImgLink} alt={username} />
    </a>
  );
};

export default Author;
