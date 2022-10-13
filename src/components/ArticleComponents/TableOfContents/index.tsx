import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'gatsby';
import { TableOfContentsItem } from '../../../types';
import styles from './index.module.scss';

interface Props {
  tableOfContents: TableOfContentsItem[];
}

const traverseTableOfContents = (
  items: TableOfContentsItem[],
  depth: number
) => {
  const filterItems = (subItems: TableOfContentsItem[]) =>
    subItems.filter(item => item && item.title && item.url);

  const currentItems = filterItems(items);

  if (currentItems) {
    return (
      <ul>
        {currentItems.map(item => (
          <li key={item.url}>
            {item.url && item.title && <Link to={item.url}>{item.title}</Link>}
            {item.items && depth < 2 && filterItems(item.items).length > 0
              ? traverseTableOfContents(item.items, depth + 1)
              : null}
          </li>
        ))}
      </ul>
    );
  }

  return null;
};

const TableOfContents = ({ tableOfContents }: Props): JSX.Element => {
  if (tableOfContents.length) {
    return (
      <details className={styles.tableOfContents}>
        <summary>
          <strong>
            <FormattedMessage id="components.tableOfContents.heading" />
          </strong>
        </summary>
        {traverseTableOfContents(tableOfContents, 1)}
      </details>
    );
  }

  return <div />;
};

export default TableOfContents;
