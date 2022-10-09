import React from 'react';
import { renderToString } from 'react-dom/server';

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

// This component exists to normalise HTML tables following the format
// That always a <thead> and a <tbody> are mandatory
// It also fixes up Tables that have swapped th's and td's
const Table = ({ children }: React.PropsWithChildren): JSX.Element | null => {
  if (!children || !Array.isArray(children)) {
    return null;
  }

  const filteredChildren = children.filter(c => typeof c === 'object');

  if (filteredChildren.length === 0) {
    return null;
  }

  if (filteredChildren.length === 1) {
    return (
      <table>
        <tbody
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: mutateChildren(
              filteredChildren[0].props.children,
              '<th',
              '<td'
            ),
          }}
        />
      </table>
    );
  }

  const isFirstElementHeader = filteredChildren[0].props.mdxType === 'thead';
  const isSecondElementBody = filteredChildren[1].props.mdxType === 'tbody';

  return (
    <table>
      <thead
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: !isFirstElementHeader
            ? mutateChildren(filteredChildren[0].props.children, '<td', '<th')
            : renderToString(filteredChildren[0].props.children as JSX.Element),
        }}
      />
      <tbody
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: !isSecondElementBody
            ? filteredChildren
                .slice(1)
                .map(item => surroundChildren(item.props.children, 'tr'))
                .join('')
            : renderToString(filteredChildren[1].props.children as JSX.Element),
        }}
      />
    </table>
  );
};

export default Table;
