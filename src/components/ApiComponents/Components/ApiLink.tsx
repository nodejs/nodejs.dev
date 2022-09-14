import React from 'react';
import { MdxLink } from 'gatsby-theme-i18n';
import { replaceDataTagFromString } from '../../../util/replaceDataTag';

interface Props {
  href: string;
  children: unknown;
  [o: string]: unknown;
}

const ApiLink = ({ href, ...props }: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MdxLink href={replaceDataTagFromString(href || '')} {...props} />
);

export default ApiLink;
