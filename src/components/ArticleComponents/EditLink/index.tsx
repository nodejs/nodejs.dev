import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

interface Props {
  relativePath?: string;
  editPath?: string;
  absolutePath?: string;
}

const baseURL = 'https://github.com/nodejs/nodejs.dev/edit/main';

const EditLink = ({
  relativePath,
  editPath,
  absolutePath,
}: Props): JSX.Element | null => {
  if (!relativePath && !editPath && !absolutePath) return null;

  const href =
    absolutePath ||
    (relativePath
      ? `${baseURL}/content/learn/${relativePath}`
      : `${baseURL}/${editPath}`);

  return (
    <div className={styles.edit}>
      <a href={href}>
        <FormattedMessage id="components.editLink.title" tagName="span" />
        <FontAwesomeIcon icon={faPencil} />
      </a>
    </div>
  );
};

export default EditLink;
