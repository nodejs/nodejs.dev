import React from 'react';
import { renderToString } from 'react-dom/server';

interface MdxChildren {
  props: {
    children: JSX.Element[] | JSX.Element;
    mdxType: string;
  };
}

interface Props {
  children: MdxChildren[];
}

const mutateChildren = (
  children: JSX.Element[] | JSX.Element,
  oldTag: string,
  newTag: string
): string => {
  if (Array.isArray(children)) {
    return children
      .map(child => renderToString(child).replace(oldTag, newTag))
      .join('');
  }

  return mutateChildren([children], oldTag, newTag);
};

const surroundChildren = (children: JSX.Element[] | JSX.Element, tag: string) =>
  `<${tag}>${mutateChildren(children, '<th', '<td')}</${tag}>`;

const Table = ({ children }: Props): JSX.Element | null => {
  if (children.length === 0) {
    return null;
  }

  if (children.length === 1) {
    return (
      <table>
        <tbody
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: mutateChildren(children[0].props.children, '<th', '<td'),
          }}
        />
      </table>
    );
  }

  const isFirstElementHeader = children[0].props.mdxType === 'thead';
  const isSecondElementBody = children[1].props.mdxType === 'tbody';

  return (
    <table>
      <thead
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: !isFirstElementHeader
            ? mutateChildren(children[0].props.children, '<td', '<th')
            : renderToString(children[0].props.children as JSX.Element),
        }}
      />
      <tbody
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: !isSecondElementBody
            ? children
                .slice(1)
                .map(item => surroundChildren(item.props.children, 'tr'))
                .join('')
            : renderToString(children[1].props.children as JSX.Element),
        }}
      />
    </table>
  );
};

export default Table;
