export interface NavigationSectionData {
  title: string;
  section: NavigationItemData[];
  currentSlug: string;
}

export interface NavigationItemData {
  slug: string;
  title: string;
}

export interface NavigationData {
  [index: string]: NavigationItemData[];
}
