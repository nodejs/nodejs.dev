import React, { useState } from 'react';
import NavigationSection from './navigation-section';
import { NavigationSectionData } from '../types';
import { isSmallScreen } from '../util/isSmallScreen';

type Props = {
  sections: NavigationSectionData;
  currentSlug: string;
};

const Navigation = ({ sections, currentSlug }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const onItemClick = () => {
    if (isSmallScreen()) {
      toggle();
    }
  };
  const className = isOpen ? 'side-nav side-nav--open' : 'side-nav';

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
        />
      ))}
    </nav>
  );
};

export default Navigation;
