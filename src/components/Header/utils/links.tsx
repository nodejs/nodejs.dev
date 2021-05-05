import { HeaderType } from './types'

export const headersLinks = [
  {
    type: HeaderType.Link,
    to: '/learn',
    classes: 'activeStyleTab',
    title: 'Learn',
    activeClassName: 'active',
    partiallyActive: true
  },
  {
    type: HeaderType.Anchor,
    href: 'https://nodejs.org/en/docs/',
    classes: 'activeStyleTab',
    mobileTitle: 'Docs',
    title: 'Documentation',
    checkMobile: true
  },
  {
    to: '/download',
    classes: 'activeStyleTab',
    title: 'Download',
    activeClassName: 'active',
    partiallyActive: true
  },
  {
    type: HeaderType.Anchor,
    href: 'https://nodejs.org/en/get-involved/',
    classes: 'activeStyleTab',
    title: 'Community'
  }
]
