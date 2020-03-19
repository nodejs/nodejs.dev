import React from 'react';
import renderer from 'react-test-renderer';
import NavigationItem from '../../src/components/navigation-item';
import { createNavigationItemData } from '../__fixtures__/navigation';

describe('NavigationItem component', () => {
  it('renders correctly', () => {
    const {
      key,
      title,
      slug,
      isRead,
      isActive,
      onClick,
      autoScroll,
    } = createNavigationItemData();
    const tree = renderer
      .create(
        <NavigationItem
          key={key}
          title={title}
          slug={slug}
          isRead={isRead}
          isActive={isActive}
          onClick={onClick}
          autoScroll={autoScroll}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
