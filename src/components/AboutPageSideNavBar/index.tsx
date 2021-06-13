import React, { useRef, useState } from 'react';
import { AboutPageSideNavBarItem } from '../../types';
import NavigationItem from '../NavigationItem';
import '../../styles/about.scss';

// eslint-disable-next-line no-shadow
export enum AboutPageKeys {
  about = '',
  governance = 'governance',
  community = 'community',
  workingGroups = 'working-groups',
  releases = 'releases',
  resources = 'resources',
  trademark = 'trademark',
  privacy = 'privacy',
}

const aboutPageSideNavBarItem: AboutPageSideNavBarItem[] = [
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
];

export default function AboutPageSideNavBar({
  pageKey,
}: {
  pageKey: string;
}): JSX.Element {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const toggle = (): void => setNavOpen(!navOpen);

  const className = navOpen
    ? 'side-nav-about side-nav--open'
    : 'side-nav-about';
  const navElement = useRef<HTMLElement | null>(null);
  return (
    <>
      {' '}
      <nav className={className} ref={navElement}>
        <button type="button" className="side-nav__open" onClick={toggle}>
          Menu
        </button>
        <ul className="community-nav__list">
          {aboutPageSideNavBarItem.map(({ title: commTitle, slug }) => {
            return (
              <>
                <NavigationItem
                  key={slug}
                  title={commTitle}
                  isLearn={false}
                  isRead={false}
                  isActive={slug === pageKey}
                  slug={slug}
                  baseUrl="/"
                />
              </>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
