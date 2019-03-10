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
  Object.keys(sections).map(sectionKey => {
    flatSessions = [...flatSessions, ...sections[sectionKey]];
  });
  const currentSlugIndex = flatSessions.findIndex(
    item => item.slug === currentSlug
  );
  flatSessions.forEach((item, index) => {
    item.isDone = index < currentSlugIndex;
  });

  return (
    <nav className={className}>
      <button className="side-nav__open" onClick={toggle}>
        Menu
      </button>
      {Object.keys(sections).map(section => (
        <NavigationSection
          key={section}
          title={section}
          section={sections[section]}
          currentSlug={currentSlug}
          onItemClick={onItemClick}
          flatSessions={flatSessions}
        />
      ))}
    </nav>
  );
};

export default Navigation;
