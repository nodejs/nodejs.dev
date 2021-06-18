import React from 'react';
import { render } from '@testing-library/react';
import AboutPageSideNavBar, {
  AboutPageKeys,
} from '../../src/components/AboutPageSideNavBar';

describe('AboutPageSideNavBar', () => {
  it('renders correctly', () => {
    const { container } = render(
      <AboutPageSideNavBar pageKey={AboutPageKeys.trademark} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should about Releases page exist and contain a href to `~/release`', () => {
    const { container } = render(
      <AboutPageSideNavBar pageKey={AboutPageKeys.releases} />
    );
    expect(container).toMatchSnapshot();
    expect(container.innerHTML).toContain('href="/releases');
  });

  it('should set the a single page as active', () => {
    const { container } = render(
      <AboutPageSideNavBar pageKey={AboutPageKeys.releases} />
    );
    const innrerHtml = container.innerHTML;
    const activeLinks = innrerHtml.match('side-nav__item-community--active');
    expect(activeLinks.length).toBe(1);
  });
});
