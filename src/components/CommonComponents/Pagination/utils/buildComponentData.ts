import { createElement, MouseEvent, ReactElement } from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { FormattedMessage } from 'react-intl';
import { PageType } from './buildPaginationModel';

type OnClick = {
  (event: MouseEvent): void;
};

interface Props extends Partial<HTMLElement> {
  as: string;
  onClick?: OnClick;
  to?: string;
}

interface ComponentData {
  props: Props;
  key: string;
  content: string | ReactElement;
}

export function buildComponentData(
  page: PageType,
  hrefBuilder: (n: number) => string,
  onClick: OnClick
): ComponentData {
  const props: Props = { as: '', className: page?.className ?? '' };
  let content: string | ReactElement = '';
  let key = '';

  // eslint-disable-next-line default-case
  switch (page.type) {
    case 'PREV': {
      key = 'page-prev';
      content = createElement(FormattedMessage, {
        id: 'components.pagination.previous',
      });
      if (page.disabled) {
        Object.assign(props, { as: 'span', 'aria-disabled': 'true' });
      } else {
        Object.assign(props, {
          as: Link,
          rel: 'prev',
          to: hrefBuilder(page.num),
          'aria-label': 'Previous Page',
          onClick,
        });
      }
      break;
    }
    case 'NEXT': {
      key = 'page-next';
      content = createElement(FormattedMessage, {
        id: 'components.pagination.next',
      });
      if (page.disabled) {
        Object.assign(props, { as: 'span', 'aria-disabled': 'true' });
      } else {
        Object.assign(props, {
          as: Link,
          rel: 'next',
          to: hrefBuilder(page.num),
          'aria-label': 'Next Page',
          onClick,
        });
      }
      break;
    }
    case 'NUM': {
      key = `page-${page.num}`;
      content = String(page.num);
      if (page.selected) {
        Object.assign(props, { as: 'em', 'aria-current': 'page' });
      } else {
        Object.assign(props, {
          as: Link,
          to: hrefBuilder(page.num),
          'aria-label': `Page ${page.num}`,
          onClick,
        });
      }
      break;
    }
    case 'BREAK': {
      key = `page-${page.num}-break`;
      content = '…';
      Object.assign(props, { as: 'span', 'aria-disabled': true });
    }
  }

  return { props, key, content };
}
