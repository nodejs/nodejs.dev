import React from 'react';
import { replaceDataTagFromString } from '../../../util/replaceDataTag';

interface Props {
  id: string;
  [o: string]: unknown;
}
export const H5 = ({ id, ...props }: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading, jsx-a11y/heading-has-content
  <h5 id={replaceDataTagFromString(id)} {...props} />
);

export const H4 = ({ id, ...props }: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading, jsx-a11y/heading-has-content
  <h4 id={replaceDataTagFromString(id)} {...props} />
);

export const H3 = ({ id, ...props }: Props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading, jsx-a11y/heading-has-content
  <h3 id={replaceDataTagFromString(id)} {...props} />
);
