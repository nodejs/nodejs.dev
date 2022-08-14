import React from 'react';
import NavigationItem from '../src/components/NavigationItem';
import '../src/styles/tokens.scss';
import '../src/styles/layout.scss';
import '../src/styles/mobile.scss';
import '../src/styles/learn.scss';

export default {
  title: 'NavigationItem',
  component: NavigationItem,
};
const noop = (): null => {
  return null;
};

export const Root = (): JSX.Element => (
  <NavigationItem
    key="123"
    isRead
    isActive
    slug="versioning"
    onClick={noop}
    title="Navigation Item"
    baseUrl="/"
  />
);
