import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import SideNavBar, { SideNavBarKeys, OverflowTypes } from '..';
import { SideNavBarItem } from '../../../types';

const navbarButtons = [
  {
    pageKey: SideNavBarKeys.about,
    expectedText: 'About Node.js',
    expectedHref: '/about/',
  },
  {
    pageKey: SideNavBarKeys.governance,
    expectedText: 'Project Governance',
    expectedHref: '/about/governance/',
  },
  {
    pageKey: SideNavBarKeys.releases,
    expectedText: 'Releases',
    expectedHref: '/about/releases/',
  },
  {
    pageKey: SideNavBarKeys.resources,
    expectedText: 'Resources',
    expectedHref: '/about/resources/',
  },
  {
    pageKey: SideNavBarKeys.privacy,
    expectedText: 'Privacy Policy',
    expectedHref: 'https://privacy-policy.openjsf.org/',
  },
  {
    pageKey: SideNavBarKeys.security,
    expectedText: 'Security Reporting',
    expectedHref: '/about/security/',
  },
  {
    pageKey: SideNavBarKeys.getInvolved,
    expectedText: 'Get Involved',
    expectedHref: '/get-involved/',
  },
  {
    pageKey: SideNavBarKeys.codeLearn,
    expectedText: 'Code + Learn',
    expectedHref: '/get-involved/code-learn',
  },
  {
    pageKey: SideNavBarKeys.collabSummit,
    expectedText: 'Collab Summit',
    expectedHref: '/get-involved/collab-summit',
  },
  {
    pageKey: SideNavBarKeys.contribute,
    expectedText: 'Contribute',
    expectedHref: '/get-involved/contribute',
  },
  {
    pageKey: SideNavBarKeys.codeOfConduct,
    expectedText: 'Code of Conduct',
    expectedHref:
      'https://github.com/nodejs/node/blob/main/doc/contributing/code-of-conduct.md',
  },
  {
    pageKey: SideNavBarKeys.download,
    expectedText: 'Download',
    expectedHref: '/download/',
  },
  {
    pageKey: SideNavBarKeys.packageManager,
    expectedText: 'Package Manager',
    expectedHref: '/download/package-manager/',
  },
  {
    pageKey: SideNavBarKeys.previousReleases,
    expectedText: 'Previous Releases',
    expectedHref: '/download/releases/',
  },
];

describe('SideNavBar', () => {
  it('renders correctly', () => {
    const { container } = render(<SideNavBar pageKey={SideNavBarKeys.about} />);
    expect(container).toMatchSnapshot();
  });

  navbarButtons.forEach(button => {
    it(`should contain a href to '~${button.expectedHref}'`, () => {
      render(<SideNavBar pageKey={button.pageKey} />);
      const aboutNavBarElement = screen.getByText(button.expectedText);
      expect(aboutNavBarElement.getAttribute('href')).toBe(button.expectedHref);
    });
  });

  it('should set the a single page as active', () => {
    const { container } = render(
      <SideNavBar pageKey={SideNavBarKeys.releases} />
    );
    const innrerHtml = container.innerHTML;
    const activeLinks = innrerHtml.match('navigationItemActive');
    expect(activeLinks && activeLinks.length).toBe(1);
  });

  it('should set the body overflow hidden/unset on toggling', async () => {
    render(<SideNavBar pageKey={SideNavBarKeys.releases} />);
    const downloadItem: Element = screen.getAllByRole('button')[0] as Element;
    expect(document.body.style.overflow).toBe(OverflowTypes.unset);
    await userEvent.click(downloadItem);
    expect(document.body.style.overflow).toBe(OverflowTypes.hidden);
    await userEvent.click(downloadItem);
    expect(document.body.style.overflow).toBe(OverflowTypes.unset);
    await userEvent.click(downloadItem);
    expect(document.body.style.overflow).toBe(OverflowTypes.hidden);
    await userEvent.click(downloadItem);
    expect(document.body.style.overflow).toBe(OverflowTypes.unset);
  });

  it('should contain a href to https link', () => {
    const title = 'title';
    const slug = 'https://test.domain';
    const items: SideNavBarItem[] = [{ title, slug, isTitle: true }];
    render(<SideNavBar pageKey={SideNavBarKeys.releases} items={items} />);
    const navBarElement = screen.getByText(title);
    expect(navBarElement.getAttribute('href')).toBe(slug);
  });

  it('should close the Navigation when a link is clicked', async () => {
    const activeClassName = 'navigationItemActive';
    render(<SideNavBar pageKey={SideNavBarKeys.releases} />);
    const releasesNavBarElement = screen.getByText('Releases');
    expect(releasesNavBarElement.classList).toContain(activeClassName);
    await userEvent.click(releasesNavBarElement);
    expect(releasesNavBarElement.classList).toEqual(
      expect.not.arrayContaining([activeClassName])
    );
  });
});
