import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ApiChange, ApiUpdate } from '../../../../types';
import { parseApiDocsVersion } from '../../../../util/parseApiDocsVersion';
import styles from './index.module.scss';

interface Props {
  update: ApiUpdate;
  changes: ApiChange[];
}

const Changes = ({ update, changes }: Props) => (
  <details className={styles.changesComponent}>
    <summary>
      <strong>
        <FormattedMessage id="docs.api.history" />
      </strong>
    </summary>
    <table>
      <thead>
        <tr>
          <th>
            <FormattedMessage id="docs.api.history.version" />
          </th>
          <th>
            <FormattedMessage id="docs.api.history.changes" />
          </th>
        </tr>
      </thead>
      <tbody>
        {changes.map(({ version, description }) => (
          <tr key={`${version.toString()}-${description}`}>
            <td>{parseApiDocsVersion(version)}</td>
            <td>{description}</td>
          </tr>
        ))}
        <tr>
          <td>{parseApiDocsVersion(update.version)}</td>
          <td>
            <FormattedMessage
              id="docs.api.addedIn"
              values={{ version: parseApiDocsVersion(update.version) }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  </details>
);

export default Changes;
