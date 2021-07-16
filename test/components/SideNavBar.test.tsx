import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import SideNavBar, {
  AboutPageKeys,
  DownloadPageKeys,
  OverflowTypes,
} from '../../src/components/SideNavBar';

describe('SideNavBar', () => {
  describe('AboutPageSideNavBar', () => {
    it('renders correctly', () => {
      const { container } = render(
        <SideNavBar pageKey={AboutPageKeys.trademark} parent="about" />
      );
      expect(container).toMatchSnapshot();
    });

    it('should about Releases page exist and contain a href to `~/release`', () => {
      render(<SideNavBar pageKey={AboutPageKeys.releases} parent="about" />);
      const releasesNavBarElement = screen.getByText('Releases');
      expect(releasesNavBarElement.getAttribute('href')).toBe('/releases');
    });

    it('should set the a single page as active', () => {
      const { container } = render(
        <SideNavBar pageKey={AboutPageKeys.releases} parent="about" />
      );
      const innrerHtml = container.innerHTML;
      const activeLinks = innrerHtml.match('side-nav__item-community--active');
      expect(activeLinks.length).toBe(1);
    });
    it('should set the body overflow hidden on menu click', () => {
      render(<SideNavBar pageKey={AboutPageKeys.releases} parent="about" />);
      const downloadItem: Element = screen.getAllByRole('button')[0] as Element;
      expect(document.body.style.overflow).toBe(OverflowTypes.unset);
      fireEvent.click(downloadItem);
      expect(document.body.style.overflow).toBe(OverflowTypes.hidden);
    });

    it('should set the body overflow hidden/unset on toggling', () => {
      render(<SideNavBar pageKey={AboutPageKeys.releases} parent="about" />);
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
  describe('DownloadPageSideNavBar', () => {
    it('renders correctly', () => {
      const { container } = render(
        <SideNavBar
          pageKey={DownloadPageKeys.packageManager}
          parent="download"
        />
      );
      expect(container).toMatchSnapshot();
    });
    it('should contain an href to `~/package-manager`', () => {
      render(
        <SideNavBar
          pageKey={DownloadPageKeys.packageManager}
          parent="download"
        />
      );
      const packageManagerNavBarElement = screen.getByText('Package Manager');
      expect(packageManagerNavBarElement.getAttribute('href')).toBe(
        '/package-manager'
      );
    });
  });
});
