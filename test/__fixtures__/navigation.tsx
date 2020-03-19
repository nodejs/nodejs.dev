import { NavigationItemProps } from '../../src/components/navigation-item';

export const createNavigationItemData = () =>
  ({
    key: '',
    isRead: true,
    isActive: true,
    slug: '',
    title: '',
    onClick: () => {},
    autoScroll: number => {},
  } as NavigationItemProps);
