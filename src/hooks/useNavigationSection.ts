import { useState } from 'react';
import type { NavigationItemData } from '../types';

interface Props {
  section: NavigationItemData[];
  currentSlug: string;
}

export const useNavigationSection = ({ section, currentSlug }: Props) => {
  const isActive = (item: NavigationItemData) => item.slug === currentSlug;

  const [isOpen, setIsOpen] = useState(section.some(isActive));
  const toggle = (): void => setIsOpen(!isOpen);

  return { toggleSection: toggle, isSectionOpen: isOpen };
};
