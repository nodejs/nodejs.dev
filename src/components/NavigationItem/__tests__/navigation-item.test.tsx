import React from 'react';
import { render } from '@testing-library/react';
import NavigationItem from '..';

describe('NavigationItem component', (): void => {
  it('renders correctly', (): void => {
    const { container } = render(
      <NavigationItem
        key="123"
        isRead
        isActive
        slug="versioning"
        title="Versioning"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders nav item styles for learn page by default', (): void => {
    render(
      <NavigationItem
        key="123"
        isRead
        isActive
        slug="versioning"
        title="Versioning"
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const sideNavElement = document.getElementsByClassName('side-nav__item')[0];
    expect(sideNavElement).toBeDefined();
    expect(sideNavElement).toBeInTheDocument();
    expect(sideNavElement).toBeVisible();

    // eslint-disable-next-line testing-library/no-node-access
    const communitySideNavElms = document.getElementsByClassName(
      'side-nav__item-community'
    );
    expect(communitySideNavElms.length).toBe(0);
  });

  it('renders nav item styles for community page when isLearn is false', (): void => {
    render(
      <NavigationItem
        key="123"
        isRead
        isActive
        slug="versioning"
        title="Versioning"
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const communitySideNavElement = document.getElementsByClassName(
      'side-nav__item-community'
    )[0];
    expect(communitySideNavElement).toBeDefined();
    expect(communitySideNavElement).toBeInTheDocument();
    expect(communitySideNavElement).toBeVisible();

    // eslint-disable-next-line testing-library/no-node-access
    const sideNavElements = document.getElementsByClassName('side-nav__item');
    expect(sideNavElements.length).toBe(0);
  });
});
