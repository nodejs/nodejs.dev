import React, { useState } from 'react';
import NavigationSection from './navigation-section';
import { NavigationSectionData, NavigationSectionItem } from '../types';
import { isSmallScreen } from '../util/isSmallScreen';

type Props = {
  sections: NavigationSectionData;
  currentSlug: string;
};

const Navigation = ({ sections, currentSlug }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);
  const onItemClick = () => {
    if (isSmallScreen()) {
      toggle();
    }
  };
  const className = isOpen ? 'side-nav side-nav--open' : 'side-nav';
  let flatSessions: NavigationSectionItem[] = [];
  Object.keys(sections).map((sectionKey: string) => {
    flatSessions = [...flatSessions, ...sections[sectionKey]];
  });

  let currentSlugIndex: number = -1;
  for (let i: number = 0; i < flatSessions.length; i++) {
    if (flatSessions[i].slug === currentSlug) {
      currentSlugIndex = i;
      break;
    }
  }

  flatSessions.forEach((item: NavigationSectionItem, index: number) => {
    item.isDone = index < currentSlugIndex;
  });

  return (
    <nav className={className}>
      <button className="side-nav__open" onClick={toggle}>
        Menu
      </button>
      {Object.keys(sections).map((sectionKey: string) => (
        <NavigationSection
          key={sectionKey}
          title={sectionKey}
          section={sections[sectionKey]}
          currentSlug={currentSlug}
          onItemClick={onItemClick}
          flatSessions={flatSessions}
        />
      ))}
    </nav>
  );
};

export default Navigation;
