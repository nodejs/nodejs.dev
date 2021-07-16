import React, { useRef, useState } from 'react';
import { SideNavBarItem } from '../../types';
import NavigationItem from '../NavigationItem';
import '../../styles/about.scss';

// eslint-disable-next-line no-shadow
export enum AboutPageKeys {
  about = 'about',
  governance = 'governance',
  community = 'community',
  workingGroups = 'working-groups',
  releases = 'releases',
  resources = 'resources',
  trademark = 'trademark',
  privacy = 'privacy',
  security = 'security',
}

// eslint-disable-next-line no-shadow
export enum DownloadPageKeys {
  packageManager = 'package-manager',
}

const aboutPageSideNavBarItem: SideNavBarItem[] = [
  {
    title: 'About',
    slug: AboutPageKeys.about,
  },
  {
    title: 'Project Governance',
    slug: AboutPageKeys.governance,
  },
  {
    title: 'Community',
    slug: AboutPageKeys.community,
  },
  {
    title: 'Working Groups',
    slug: AboutPageKeys.workingGroups,
  },
  {
    title: 'Releases',
    slug: AboutPageKeys.releases,
  },
  {
    title: 'Resources',
    slug: AboutPageKeys.resources,
  },
  {
    title: 'Trademark Policy',
    slug: AboutPageKeys.trademark,
  },
  {
    title: 'Privacy Policy',
    slug: AboutPageKeys.privacy,
  },
  {
    title: 'Security Reporting',
    slug: AboutPageKeys.security,
  },
];

const downloadPageSideNavBarItem: SideNavBarItem[] = [
  {
    title: 'Package Manager',
    slug: DownloadPageKeys.packageManager,
  },
];

// eslint-disable-next-line no-shadow
export enum OverflowTypes {
  unset = 'unset',
  hidden = 'hidden',
}

interface NavBarProps {
  pageKey: string;
  parent: 'about' | 'download';
}

export default function SideNavBar({
  pageKey,
  parent,
}: NavBarProps): JSX.Element {
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

  const generateNavItems = () => {
    switch (parent) {
      case 'about':
        return aboutPageSideNavBarItem.map(({ title: commTitle, slug }) => {
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
        });
      case 'download':
        return downloadPageSideNavBarItem.map(({ title: commTitle, slug }) => {
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
        });
      default:
        return [];
    }
  };

  return (
    <nav className={className} ref={navElement}>
      <button type="button" className="side-nav__open" onClick={toggle}>
        Menu
      </button>
      <ul className="community-nav__list">{generateNavItems()}</ul>
    </nav>
  );
}
