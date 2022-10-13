import type { NavigationData, NavigationItemData } from '../types';

interface Props {
  sections: NavigationData;
  currentSlug: string;
}

export const useReadSections = ({ sections, currentSlug }: Props) => {
  const readSections: Set<NavigationItemData['slug']> = new Set();

  // Assume section items up to the one currently open have been read. Track
  // their unique slugs in `readSections` set.
  Object.keys(sections).some(sectionKey => {
    let isCurrentSlug = false;

    sections[sectionKey].some(sectionItem => {
      isCurrentSlug = sectionItem.slug === currentSlug;

      if (!isCurrentSlug) {
        readSections.add(sectionItem.slug);
      }

      return isCurrentSlug;
    });

    return isCurrentSlug;
  });

  return { isRead: (slug: string) => readSections.has(slug) };
};
