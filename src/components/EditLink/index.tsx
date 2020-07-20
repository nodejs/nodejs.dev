import { css, SerializedStyles } from '@emotion/core';
import React from 'react';

const edit: SerializedStyles = css`
  display: flex;
  flex-wrap: wrap;
`;

const link: SerializedStyles = css`
  color: var(--black7) !important;
  text-transform: uppercase;
  text-decoration: none !important;
  font-size: 1.4rem;
  font-weight: normal;
  font-family: var(--sans-serif);
  vertical-align: middle;

  span {
    vertical-align: middle;
    font-weight: normal;
  }

  &:hover {
    color: var(--brand-light) !important;
  }
`;

const icon: SerializedStyles = css`
  margin-left: 0.5rem;
  vertical-align: middle;
`;

interface Props {
  relativePath?: string;
}

const EditLink = ({ relativePath }: Props): JSX.Element | null => {
  if (!relativePath) {
    return null;
  }

  const href = `https://github.com/nodejs/nodejs.dev/edit/master/src/documentation/${relativePath}`;

  return (
    <div css={edit}>
      <a css={link} href={href}>
        <span>Edit this page on GitHub</span>{' '}
        <svg
          css={icon}
          fill="currentColor"
          height="1em"
          width="1em"
          viewBox="0 0 40 40"
        >
          <path d="m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z" />
        </svg>
      </a>
    </div>
  );
};

export default EditLink;
