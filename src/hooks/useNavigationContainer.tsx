import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import type { NavigationData, NavigationItemData } from '../types';

type SectionTuple = [string, NavigationItemData[]][];

export const useNavigationContainer = (label: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // When clicking on a link gracefully close the Navigation
  const onClick = () => setIsOpen(false);

  const renderContainer = ({ children }: React.PropsWithChildren) => (
    <Navigation isOpen={isOpen} toggleNavigation={toggle} label={label}>
      {children}
    </Navigation>
  );

  const renderSections = (sections: NavigationData): SectionTuple =>
    Object.keys(sections).map(key => [key, sections[key]]);

  return { onClick, renderContainer, renderSections };
};
