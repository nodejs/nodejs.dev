import React, { useRef, useState, useMemo, useEffect } from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { FormattedMessage, useIntl } from 'react-intl';
import GroupsIcon from '@mui/icons-material/Groups';
import InfoIcon from '@mui/icons-material/Info';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import classnames from 'classnames';
import { SideNavBarItem } from '../../types';
import NavigationItem from '../NavigationItem';
import styles from './index.module.scss';

// eslint-disable-next-line no-shadow
export enum SideNavBarKeys {
  about = '/about/',
  governance = '/about/governance/',
  releases = '/about/releases/',
  resources = '/about/resources/',
  privacy = '/about/privacy/',
  security = '/about/security/',
  getInvolved = '/get-involved/',
  codeLearn = '/get-involved/code-learn',
  collabSummit = '/get-involved/collab-summit',
  contribute = '/get-involved/contribute',
  download = '/download/',
  packageManager = '/download/package-manager/',
  previousReleases = '/download/releases/',
  codeOfConduct = 'https://github.com/nodejs/node/blob/main/doc/contributing/code-of-conduct.md',
}

const sideNavBarItems: SideNavBarItem[] = [
  {
    title: 'components.sideBar.section.about',
    slug: SideNavBarKeys.about,
    icon: InfoIcon,
    isTitle: true,
  },
  {
    title: 'components.sideBar.items.governance',
    slug: SideNavBarKeys.governance,
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
    title: 'components.sideBar.section.getInvolved',
    slug: SideNavBarKeys.getInvolved,
    icon: GroupsIcon,
    isTitle: true,
  },
  {
    title: 'components.sideBar.items.codeLearn',
    slug: SideNavBarKeys.codeLearn,
  },
  {
    title: 'components.sideBar.items.collabSummit',
    slug: SideNavBarKeys.collabSummit,
  },
  {
    title: 'components.sideBar.items.contribute',
    slug: SideNavBarKeys.contribute,
  },
  {
    title: 'components.sideBar.items.codeOfConduct',
    slug: SideNavBarKeys.codeOfConduct,
  },
  {
    title: 'components.sideBar.section.download',
    slug: SideNavBarKeys.download,
    icon: CloudDownloadIcon,
    isTitle: true,
  },
  {
    title: 'components.sideBar.items.packageManager',
    slug: SideNavBarKeys.packageManager,
  },
  {
    title: 'components.sideBar.items.previousReleases',
    slug: SideNavBarKeys.previousReleases,
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
}

const SideNavBar = ({ pageKey, items = sideNavBarItems }: NavBarProps) => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const toggle = (): void => setNavOpen(!navOpen);
  const intl = useIntl();

  const navigationClasses = classnames(styles.sideNav, {
    [styles.sideNavFixed]: navOpen,
  });

  useEffect(() => {
    if (typeof document === 'object' && document.body) {
      document.body.style.overflow = navOpen
        ? OverflowTypes.hidden
        : OverflowTypes.unset;
    }
  }, [navOpen]);

  const navElement = useRef<HTMLElement | null>(null);

  const renderTitle = ({ title, slug, icon: Icon }: SideNavBarItem) => {
    const titleContent = (
      <>
        {title}
        {Icon && <Icon />}
      </>
    );

    if (slug.startsWith('https')) {
      return (
        <a key={slug} href={slug} className={styles.sideNavSectionTitle}>
          {titleContent}
        </a>
      );
    }

    return (
      <Link key={slug} to={slug} className={styles.sideNavSectionTitle}>
        {titleContent}
      </Link>
    );
  };

  const renderItem = ({ title, slug }: SideNavBarItem) => (
    <NavigationItem
      key={slug}
      title={title}
      isRead={false}
      isActive={slug === pageKey}
      slug={slug}
    />
  );

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
      <div className={styles.sideNavSection}>
        {translatedSidebar.map(({ isTitle, ...props }) =>
          isTitle ? renderTitle(props) : renderItem(props)
        )}
      </div>
    </nav>
  );
};

export default SideNavBar;
