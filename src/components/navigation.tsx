import React, { useState } from 'react';
import NavigationSection from './navigation-section';
import { NavigationSectionData } from '../types';
import { isSmallScreen } from '../util/isSmallScreen';

type Props = {
  sections: NavigationSectionData[];
};

const Navigation = ({ sections }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const onItemClick = () => isSmallScreen() && toggle();
  const className = isOpen ? 'side-nav side-nav--open' : 'side-nav';

  return (
    <nav className={className}>
      <button className="side-nav__open" onClick={toggle}>
        Menu
      </button>
      {sections.map((section: NavigationSectionData) => {
        return (
          <NavigationSection
            title={section.title}
            items={section.items}
            key={section.title}
            onItemClick={onItemClick}
          />
        );
      })}
    </nav>
  );
};

export default Navigation;
