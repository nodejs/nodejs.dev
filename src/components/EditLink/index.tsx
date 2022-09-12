import React from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

interface Props {
  relativePath?: string;
  editPath?: string;
  absolutePath?: string;
  hasNoAuthors?: boolean;
}

const baseURL = `https://github.com/nodejs/nodejs.dev/edit/main`;

const EditLink = ({
  relativePath,
  editPath,
  absolutePath,
  hasNoAuthors = false,
}: Props): JSX.Element | null => {
  if (!relativePath && !editPath && !absolutePath) return null;

  const href =
    absolutePath ||
    (relativePath
      ? `${baseURL}/content/learn/${relativePath}`
      : `${baseURL}/${editPath}`);

  const classNames = classnames(styles.edit, {
    [styles.editNoAuthors]: hasNoAuthors,
  });

  return (
    <div className={classNames}>
      <a href={href}>
        <FormattedMessage id="components.editLink.title" tagName="span" />
        <FontAwesomeIcon icon={faPencil} />
      </a>
    </div>
  );
};

export default EditLink;
