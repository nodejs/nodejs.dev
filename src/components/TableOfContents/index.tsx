import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'gatsby';
import { PageTableOfContents } from '../../types';
import styles from './index.module.scss';

interface Props {
  tableOfContents?: PageTableOfContents;
}

const TableOfContents = ({ tableOfContents }: Props): null | JSX.Element => {
  if (tableOfContents?.items) {
    return (
      <details className={styles.tableOfContents}>
        <summary>
          <strong>
            <FormattedMessage id="components.tableOfContents.heading" />
          </strong>
        </summary>
        <ul>
          {tableOfContents.items.map(i => (
            <li key={i.url}>
              <Link to={i.url}>{i.title}</Link>
            </li>
          ))}
        </ul>
      </details>
    );
  }

  return null;
};

export default TableOfContents;
