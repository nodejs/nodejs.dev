import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import SideNavBar, { SideNavBarKeys } from '..';
import { SideNavBarItem } from '../../../types';

describe('SideNavBar', () => {
  it('renders correctly', () => {
    const { container } = render(<SideNavBar pageKey={SideNavBarKeys.about} />);
    expect(container).toMatchSnapshot();
  });

  it('should contain a href to `~/about`', () => {
    render(<SideNavBar pageKey={SideNavBarKeys.about} />);
    const aboutNavBarElement = screen.getByText('About Node.js');
    expect(aboutNavBarElement.getAttribute('href')).toBe('/about/');
  });

  it('should contain a href to `~/about/governance`', () => {
    render(<SideNavBar pageKey={SideNavBarKeys.governance} />);
    const governanceNavBarElement = screen.getByText('Project Governance');
    expect(governanceNavBarElement.getAttribute('href')).toBe(
      '/about/governance/'
    );
  });

  it('should contain a href to `~/about/releases`', () => {
    render(<SideNavBar pageKey={SideNavBarKeys.releases} />);
    const releasesNavBarElement = screen.getByText('Releases');
    expect(releasesNavBarElement.getAttribute('href')).toBe('/about/releases/');
  });

  it('should contain a href to `~/about/resources`', () => {
    render(<SideNavBar pageKey={SideNavBarKeys.resources} />);
    const resourcesNavBarElement = screen.getByText('Resources');
    expect(resourcesNavBarElement.getAttribute('href')).toBe(
      '/about/resources/'
    );
  });

  it('should contain a href to `~/about/privacy`', () => {
    render(<SideNavBar pageKey={SideNavBarKeys.privacy} />);
    const privacyNavBarElement = screen.getByText('Privacy Policy');
    expect(privacyNavBarElement.getAttribute('href')).toBe(
      'https://privacy-policy.openjsf.org/'
    );
  });

  it('should contain a href to `~/about/security`', () => {
    render(<SideNavBar pageKey={SideNavBarKeys.security} />);
    const securityNavBarElement = screen.getByText('Security Reporting');
    expect(securityNavBarElement.getAttribute('href')).toBe('/about/security/');
  });

  it('should contain a href to `~/get-involved`', () => {
    render(<SideNavBar pageKey={SideNavBarKeys.getInvolved} />);
    const getInvolvedNavBarElement = screen.getByText('Get Involved');
    expect(getInvolvedNavBarElement.getAttribute('href')).toBe(
      '/get-involved/'
    );
  });

  it('should contain a href to `~/get-involved/code-learn`', () => {
    render(<SideNavBar pageKey={SideNavBarKeys.codeLearn} />);
    const codeLearnNavBarElement = screen.getByText('Code + Learn');
    expect(codeLearnNavBarElement.getAttribute('href')).toBe(
      '/get-involved/code-learn'
    );
  });

  it('should contain a href to `~/get-involved/collab-summit`', () => {
    render(<SideNavBar pageKey={SideNavBarKeys.collabSummit} />);
    const collabSummitNavBarElement = screen.getByText('Collab Summit');
    expect(collabSummitNavBarElement.getAttribute('href')).toBe(
      '/get-involved/collab-summit'
    );
  });

  it('should contain a href to `~/get-involved/contribute`', () => {
    render(<SideNavBar pageKey={SideNavBarKeys.contribute} />);
    const contributeNavBarElement = screen.getByText('Contribute');
    expect(contributeNavBarElement.getAttribute('href')).toBe(
      '/get-involved/contribute'
    );
  });

  it('should contain a href to Code of Conduct', () => {
    render(<SideNavBar pageKey={SideNavBarKeys.codeOfConduct} />);
    const codeOfConductNavBarElement = screen.getByText('Code of Conduct');
    const href = codeOfConductNavBarElement.getAttribute('href');
    expect((href || '').includes('code-of-conduct.md')).toBe(true);
  });

  it('should contain a href to `~/download`', () => {
    render(<SideNavBar pageKey={SideNavBarKeys.download} />);
    const downloadNavBarElement = screen.getByText('Download');
    expect(downloadNavBarElement.getAttribute('href')).toBe('/download/');
  });

  it('should contain a href to `~/download/package-manager`', () => {
    render(<SideNavBar pageKey={SideNavBarKeys.packageManager} />);
    const packageManagerNavBarElement = screen.getByText('Package Manager');
    expect(packageManagerNavBarElement.getAttribute('href')).toBe(
      '/download/package-manager/'
    );
  });

  it('should contain a href to `~/download/releases`', () => {
    render(<SideNavBar pageKey={SideNavBarKeys.previousReleases} />);
    const previousReleasesNavBarElement = screen.getByText('Previous Releases');
    expect(previousReleasesNavBarElement.getAttribute('href')).toBe(
      '/download/releases/'
    );
  });

  it('should set the a single page as active', () => {
    const { container } = render(
      <SideNavBar pageKey={SideNavBarKeys.releases} />
    );
    const innerHtml = container.innerHTML;
    const activeLinks = innerHtml.match('navigationItemActive');
    expect(activeLinks && activeLinks.length).toBe(1);
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
