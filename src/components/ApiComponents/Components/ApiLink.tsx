import React from 'react';
import { MdxLink } from 'gatsby-theme-i18n';

interface Props {
  href: string;
  children: unknown;
  [o: string]: unknown;
}

// As we replace during the API generation any Heading with prefix of `Class: ` or `Event: `
// Or Headings of H3-to-H5 with `code prefix` into a `<DataTag>` component
// Which causes MDX erroneously to generate the links including the DataTag Component as it
// was part of the heading itself.
export const replaceDataTag = (href: string) =>
  (href || '').replace(/datatag-(tagc|tagm|tage)--/, '');

const ApiLink = ({ href, ...props }: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MdxLink href={replaceDataTag(href)} {...props} />
);

export default ApiLink;
