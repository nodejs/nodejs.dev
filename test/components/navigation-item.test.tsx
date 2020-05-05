import React from 'react';
import renderer from 'react-test-renderer';
import NavigationItem from '../../src/components/navigation-item';

describe('NavigationItem component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <NavigationItem
          key={'123'}
          isRead={false}
          isActive={true}
          slug={'versioning'}
          title={'Versioning'}
          onClick={console.log}
          autoScroll={console.log}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
