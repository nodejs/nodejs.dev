import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ApiUpdate } from '../../../../types';
import { parseApiDocsVersion } from '../../../../util/parseApiDocsVersion';
import styles from './index.module.scss';

const getTranslationForType = (type: ApiUpdate['type']) => {
  switch (type) {
    case 'added':
    case 'introduced_in':
      return 'docs.api.addedIn';
    case 'deprecated':
      return 'docs.api.deprecatedIn';
    case 'napiVersion':
      return 'docs.api.nApiVersion';
    default:
      return 'docs.api.removedIn';
  }
};

const Span = ({ version, type }: ApiUpdate) => (
  <p className={styles.spanComponent}>
    <FormattedMessage
      id={getTranslationForType(type)}
      values={{ version: parseApiDocsVersion(version) }}
    />
  </p>
);

export default Span;
