import React, { useState } from 'react';
import NavigationSection from './navigation-section';
import { NavigationSectionData } from '../types';
import { isSmallScreen } from '../util/isSmallScreen';
import NavigationContext, { NavigationContextInterface }
  from './navigation-context';

type Props = {
  sections: NavigationSectionData[];
};

const Navigation = ({ sections }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const toggle = () => setIsOpen(!isOpen);
  const onItemClick = (event: HTMLAnchorElement) => {
    if (isSmallScreen()) {
      toggle();
    }
    setSelectedItem(event.target);
  };
  const className = isOpen ? 'side-nav side-nav--open' : 'side-nav';
  const navigationContext: NavigationContextInterface = {
    isOpen,
    selectedItem
  };

  return (
    <nav className={className}>
      <button className="side-nav__open" onClick={toggle}>
        Menu
      </button>
      <NavigationContext.Provider value={navigationContext}>
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
      </NavigationContext.Provider>
    </nav>
  );
};

export default Navigation;
