import { LayoutProps } from '../../src/components/layout';

export const createLayoutData = () =>
  ({
    children: <span>Test span</span>,
    title: 'This is a title',
    description: 'This is a description',
    img: '',
    href: '',
    showFooter: true,
    location: '',
  } as LayoutProps);
