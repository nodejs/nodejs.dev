import React from 'react';
import { MdxLink } from 'gatsby-theme-i18n';

interface Props {
  href: string;
  children: unknown;
  [o: string]: unknown;
}

const replaceDataTagHref = (href: string) =>
  href.replace(/datatag-(tagc|tagm|tage)--/, '');

const ApiLink = ({ href, ...props }: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MdxLink href={replaceDataTagHref(href)} {...props} />
);

export default ApiLink;
