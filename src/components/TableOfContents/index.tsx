import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'gatsby';
import { PageTableOfContents, TableOfContentsItem } from '../../types';
import styles from './index.module.scss';

interface Props {
  tableOfContents?: PageTableOfContents;
}

const removeApiSpanTagFromItem = (item: TableOfContentsItem) => ({
  ...item,
  url: item.url.replace(/datatag-(tagc|tagm|tage)--/, ''),
  title: item.title.replace(/<DataTag tag="(M|C|E)" \/> /, ''),
});

const traverseTableOfContents = (items: TableOfContentsItem[]) => (
  <ul>
    {items.map(removeApiSpanTagFromItem).map(item => (
      <li key={item.url}>
        <Link to={item.url}>{item.title}</Link>
        {item.items && traverseTableOfContents(item.items)}
      </li>
    ))}
  </ul>
);

const TableOfContents = ({ tableOfContents }: Props): null | JSX.Element => {
  if (tableOfContents?.items) {
    return (
      <details className={styles.tableOfContents}>
        <summary>
          <strong>
            <FormattedMessage id="components.tableOfContents.heading" />
          </strong>
        </summary>
        {traverseTableOfContents(tableOfContents.items)}
      </details>
    );
  }

  return null;
};

export default TableOfContents;
