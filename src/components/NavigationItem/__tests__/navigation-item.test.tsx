import React from 'react';
import renderer from 'react-test-renderer';
import NavigationItem from '..';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop(): void {}

describe('NavigationItem component', (): void => {
  it('renders correctly', (): void => {
    const tree = renderer
      .create(
        <NavigationItem
          key="123"
          isRead
          isActive
          slug="versioning"
          title="Versioning"
          onClick={noop}
          autoScroll={noop}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
