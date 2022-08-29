import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ApiChange } from '../../../types';
import { parseApiDocsVersion } from '../../../util/parseApiDocsVersion';
import styles from './changes.module.scss';

interface Props {
  added: string | string[];
  changes: ApiChange[];
}

const Changes = ({ added, changes }: Props) => (
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
          <td>{parseApiDocsVersion(added)}</td>
          <td>
            <FormattedMessage
              id="docs.api.addedIn"
              values={{ added: parseApiDocsVersion(added) }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  </details>
);

export default Changes;
