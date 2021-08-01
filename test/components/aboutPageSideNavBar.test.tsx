import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AboutPageSideNavBar, {
  SideNavBarKeys,
  OverflowTypes,
} from '../../src/components/SideNavBar';

describe('AboutPageSideNavBar', () => {
  it('renders correctly', () => {
    const { container } = render(
      <AboutPageSideNavBar pageKey={SideNavBarKeys.trademark} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should about Releases page exist and contain a href to `~/release`', () => {
    const { container } = render(
      <AboutPageSideNavBar pageKey={SideNavBarKeys.releases} />
    );
    expect(container).toMatchSnapshot();
    expect(container.innerHTML).toContain('href="/releases');
  });

  it('should set the a single page as active', () => {
    const { container } = render(
      <AboutPageSideNavBar pageKey={SideNavBarKeys.releases} />
    );
    const innrerHtml = container.innerHTML;
    const activeLinks = innrerHtml.match('side-nav__item-community--active');
    expect(activeLinks.length).toBe(1);
  });
  it('should set the body oveflow hidden on menu click', () => {
    render(<AboutPageSideNavBar pageKey={SideNavBarKeys.releases} />);
    const downloadItem: Element = screen.getAllByRole('button')[0] as Element;
    expect(document.body.style.overflow).toBe(OverflowTypes.unset);
    userEvent.click(downloadItem);
    expect(document.body.style.overflow).toBe(OverflowTypes.hidden);
  });

  fit('should set the body overflow hidden/unset on toggling', () => {
    render(<AboutPageSideNavBar pageKey={SideNavBarKeys.releases} />);
    const downloadItem: Element = screen.getAllByRole('button')[0] as Element;
    expect(document.body.style.overflow).toBe(OverflowTypes.unset);
    userEvent.click(downloadItem);
    expect(document.body.style.overflow).toBe(OverflowTypes.hidden);
    userEvent.click(downloadItem);
    expect(document.body.style.overflow).toBe(OverflowTypes.unset);
    userEvent.click(downloadItem);
    expect(document.body.style.overflow).toBe(OverflowTypes.hidden);
    userEvent.click(downloadItem);
    expect(document.body.style.overflow).toBe(OverflowTypes.unset);
  });
});
