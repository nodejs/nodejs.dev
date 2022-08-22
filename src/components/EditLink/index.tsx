import React from 'react';
import { FormattedMessage } from 'react-intl';
import './EditLink.scss';

interface Props {
  relativePath?: string;
  editPath?: string;
}

const baseURL = `https://github.com/nodejs/nodejs.dev/edit/main`;

const EditLink = ({ relativePath, editPath }: Props): JSX.Element | null => {
  if (!relativePath && !editPath) return null;

  const href = relativePath
    ? `${baseURL}/content/learn/${relativePath}`
    : `${baseURL}/${editPath}`;

  return (
    <div className="edit">
      <a className="link" href={href}>
        <FormattedMessage id="components.editLink.title" tagName="span" />
        <svg
          className="icon"
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
