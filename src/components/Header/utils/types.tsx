export enum HeaderType { Link, Anchor }

export interface LinkHeaderProps {
  type: HeaderType,
  to: string,
  classes: string,
  title: string,
  activeClassName: string,
  partiallyActive: boolean
}

export interface AnchorHeaderProps {
  type: HeaderType,
  href: string,
  classes: string,
  title?: string,
  mobileTitle?: string,
  checkMobile?: boolean
}
