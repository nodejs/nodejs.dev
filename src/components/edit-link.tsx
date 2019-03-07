import React from 'react';

type Props = {
  relativePath?: string;
};

const EditLink = ({ relativePath }: Props) => {
  if (!relativePath) {
    return null;
  }

  const href = `https://github.com/nodejs/nodejs.dev/edit/master/src/documentation/${relativePath}`;

  return (
    <a style={{ display: 'inlineFlex', marginTop: '1rem' }} href={href}>
      Edit this page on GitHub
    </a>
  );
};

export default EditLink;
