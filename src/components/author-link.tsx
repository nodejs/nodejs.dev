import React from 'react';

type Props = {
  username: string;
  key: string;
};

const AuthorLink = ({ username }: Props) => {
  if (!username) {
    return null;
  }
  const githubLink = `https://github.com/${username}`;
  return (
    <a style={{ marginLeft: '0.5rem' }} href={githubLink}>
      {username}
    </a>
  );
};

export default AuthorLink;
