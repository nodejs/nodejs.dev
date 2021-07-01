import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import AboutPageSideNavBar, {
  AboutPageKeys,
  OverflowTypes,
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
  it('should set the body oveflow hidden on menu click', () => {
    render(<AboutPageSideNavBar pageKey={AboutPageKeys.releases} />);
    const downloadItem: Element = screen.getAllByRole('button')[0] as Element;
    expect(document.body.style.overflow).toBe(OverflowTypes.unset);
    fireEvent.click(downloadItem);
    expect(document.body.style.overflow).toBe(OverflowTypes.hidden);
  });

  fit('should set the body overflow hidden/unset on toggling', () => {
    render(<AboutPageSideNavBar pageKey={AboutPageKeys.releases} />);
    const downloadItem: Element = screen.getAllByRole('button')[0] as Element;
    expect(document.body.style.overflow).toBe(OverflowTypes.unset);
    fireEvent.click(downloadItem);
    expect(document.body.style.overflow).toBe(OverflowTypes.hidden);
    fireEvent.click(downloadItem);
    expect(document.body.style.overflow).toBe(OverflowTypes.unset);
    fireEvent.click(downloadItem);
    expect(document.body.style.overflow).toBe(OverflowTypes.hidden);
    fireEvent.click(downloadItem);
    expect(document.body.style.overflow).toBe(OverflowTypes.unset);
  });
});
