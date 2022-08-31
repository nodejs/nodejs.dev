import React from 'react';
import { replaceDataTag } from './ApiLink';

interface Props {
  id: string;
  [o: string]: unknown;
}
export const H5 = ({ id, ...props }: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading, jsx-a11y/heading-has-content
  <h5 id={replaceDataTag(id)} {...props} />
);

export const H4 = ({ id, ...props }: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading, jsx-a11y/heading-has-content
  <h4 id={replaceDataTag(id)} {...props} />
);

export const H3 = ({ id, ...props }: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading, jsx-a11y/heading-has-content
  <h3 id={replaceDataTag(id)} {...props} />
);
