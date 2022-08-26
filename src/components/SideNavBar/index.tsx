import React, { useRef, useState, useMemo, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import classnames from 'classnames';
import { SideNavBarItem } from '../../types';
import NavigationItem from '../NavigationItem';
import styles from '../../styles/navigation.module.scss';

// eslint-disable-next-line no-shadow
export enum SideNavBarKeys {
  about = 'about',
  governance = 'about/governance',
  community = 'community',
  workingGroups = 'about/working-groups',
  releases = 'about/releases',
  resources = 'resources',
  privacy = 'about/privacy',
  security = 'about/security',
  packageManager = 'download/package-manager',
}

const sideNavBarItems: SideNavBarItem[] = [
  {
    title: 'components.sideBar.items.about',
    slug: SideNavBarKeys.about,
  },
  {
    title: 'components.sideBar.items.governance',
    slug: SideNavBarKeys.governance,
  },
  {
    title: 'components.sideBar.items.community',
    slug: SideNavBarKeys.community,
  },
  {
    title: 'components.sideBar.items.workingGroups',
    slug: SideNavBarKeys.workingGroups,
  },
  {
    title: 'components.sideBar.items.releases',
    slug: SideNavBarKeys.releases,
  },
  {
    title: 'components.sideBar.items.resources',
    slug: SideNavBarKeys.resources,
  },
  {
    title: 'components.sideBar.items.privacy',
    slug: SideNavBarKeys.privacy,
  },
  {
    title: 'components.sideBar.items.security',
    slug: SideNavBarKeys.security,
  },
  {
    title: 'components.sideBar.items.packageManager',
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
  title,
}: NavBarProps): JSX.Element => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const toggle = (): void => setNavOpen(!navOpen);
  const intl = useIntl();

  const navigationClasses = classnames(
    styles.sideNav,
    styles.sideNavCommunity,
    { [styles.sideNavFixed]: navOpen, [styles.sideNavCommunityFixed]: navOpen }
  );

  useEffect(() => {
    if (typeof document === 'object' && document.body) {
      document.body.style.overflow = navOpen
        ? OverflowTypes.hidden
        : OverflowTypes.unset;
    }
  }, [navOpen]);

  const navElement = useRef<HTMLElement | null>(null);

  const renderNavTitle = () => {
    if (title) {
      return (
        <li className={`t-body2 ${styles.sideNavListItemTitle}`}>
          <b>{title}</b>
          <i className="material-icons">arrow_drop_down</i>
        </li>
      );
    }

    return null;
  };

  const translatedSidebar = useMemo(
    () =>
      items.map(item => ({
        ...item,
        // Not all entries necessarily need to be translated
        // As some are non-translatable bags
        title: intl.messages[item.title]
          ? intl.formatMessage({ id: item.title })
          : item.title,
      })),
    [intl, items]
  );

  return (
    <nav className={navigationClasses} ref={navElement}>
      <button type="button" className={styles.sideNavOpen} onClick={toggle}>
        <FormattedMessage id="components.sideBar.title" />
      </button>
      <div className={styles.sideNavList}>
        {renderNavTitle()}
        {translatedSidebar
          .sort((a, b) => a.title.localeCompare(b.title))
          .map(({ title: commTitle, slug }) => (
            <NavigationItem
              key={slug}
              title={commTitle}
              isRead={false}
              isActive={slug === pageKey}
              slug={slug}
              baseUrl="/"
            />
          ))}
      </div>
    </nav>
  );
};

export default SideNavBar;
