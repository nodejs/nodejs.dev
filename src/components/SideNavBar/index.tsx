import React, { useRef, useState } from 'react';
import { SideNavBarItem } from '../../types';
import NavigationItem from '../NavigationItem';
import '../../styles/about.scss';

// eslint-disable-next-line no-shadow
export enum SideNavBarKeys {
  about = 'about',
  governance = 'about/governance',
  community = 'community',
  workingGroups = 'about/working-groups',
  releases = 'about/releases',
  resources = 'resources',
  trademark = 'about/trademark',
  privacy = 'about/privacy',
  security = 'about/security',
  packageManager = 'download/package-manager',
}

const sideNavBarItems: SideNavBarItem[] = [
  {
    title: 'About',
    slug: SideNavBarKeys.about,
  },
  {
    title: 'Project Governance',
    slug: SideNavBarKeys.governance,
  },
  {
    title: 'Community',
    slug: SideNavBarKeys.community,
  },
  {
    title: 'Working Groups',
    slug: SideNavBarKeys.workingGroups,
  },
  {
    title: 'Releases',
    slug: SideNavBarKeys.releases,
  },
  {
    title: 'Resources',
    slug: SideNavBarKeys.resources,
  },
  {
    title: 'Trademark Policy',
    slug: SideNavBarKeys.trademark,
  },
  {
    title: 'Privacy Policy',
    slug: SideNavBarKeys.privacy,
  },
  {
    title: 'Security Reporting',
    slug: SideNavBarKeys.security,
  },
  {
    title: 'Package Manager',
    slug: SideNavBarKeys.packageManager,
  },
];

// eslint-disable-next-line no-shadow
export enum OverflowTypes {
  unset = 'unset',
  hidden = 'hidden',
}

interface NavBarProps {
  pageKey?: string;
  items?: SideNavBarItem[];
  title?: string;
}

const SideNavBar = ({
  pageKey,
  items = sideNavBarItems,
}: NavBarProps): JSX.Element => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const toggle = (): void => setNavOpen(!navOpen);

  const className = navOpen
    ? 'side-nav-about side-nav--open'
    : 'side-nav-about';

  if (typeof document !== 'undefined') {
    document.body.style.overflow = navOpen
      ? OverflowTypes.hidden
      : OverflowTypes.unset;
  }

  const navElement = useRef<HTMLElement | null>(null);

  return (
    <nav className={className} ref={navElement}>
      <button type="button" className="side-nav__open" onClick={toggle}>
        Menu
      </button>
      <ul className="community-nav__list">
        {items
          .sort((a, b) => a.title.localeCompare(b.title))
          .map(({ title: commTitle, slug }) => {
            return (
              <NavigationItem
                key={slug}
                title={commTitle}
                isLearn={false}
                isRead={false}
                isActive={slug === pageKey}
                slug={slug}
                baseUrl="/"
              />
            );
          })}
      </ul>
    </nav>
  );
};

export default SideNavBar;
