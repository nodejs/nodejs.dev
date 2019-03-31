import styled from '@emotion/styled';
import React from 'react';

const Author = styled.a`
  margin-left: 0.5rem;
`;

const Img = styled.img`
  height: 30px;
  width: 30px;
  margin-top: 5px;
  border-radius: 100%;
  border: 1px solid var(--brand-light);
`;

type Props = {
  username: string;
  size: string;
};

export default ({ username, size = '64' }: Props) => {
  if (!username) {
    return null;
  }

  username = username.trim();
  const githubLink = `https://github.com/${username}`;
  const githubImgLink = `https://github.com/${username}.png?size=${size}`;

  return (
    <Author href={githubLink} title={username} key={username}>
      <Img className="author-img" src={githubImgLink} alt={username} />
    </Author>
  );
};
