import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import NavigationSection from '../../components/NavigationSection';
import { NavigationSectionData, NavigationSectionItem } from '../../types';
import styles from '../../styles/navigation.module.scss';

interface Props {
  sections: NavigationSectionData;
  currentSlug: string;
  label: string;
  category: string;
}

const Navigation = ({
  sections,
  currentSlug,
  label,
  category,
}: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = (): void => setIsOpen(!isOpen);

  const navigationClasses = classnames(styles.sideNav, {
    [styles.sideNavFixed]: isOpen,
  });

  const readSections: Set<NavigationSectionItem['slug']> = new Set();

  // Assume section items up to the one currently open have been read. Track
  // their unique slugs in `readSections` set.
  Object.keys(sections).some(sectionKey => {
    let isCurrentSlug = false;
    sections[sectionKey].data.some((sectionItem): boolean => {
      isCurrentSlug = sectionItem.slug === currentSlug;

      if (!isCurrentSlug) {
        readSections.add(sectionItem.slug);
      }

      return isCurrentSlug;
    });

    return isCurrentSlug;
  });

  return (
    <nav aria-label={label} className={navigationClasses}>
      <button type="button" className={styles.sideNavOpen} onClick={toggle}>
        <FormattedMessage id="containers.navigation.title" />
      </button>
      {Object.keys(sections).map(
        (sectionKey: string): false | JSX.Element =>
          sections[sectionKey].category === category && (
            <NavigationSection
              key={sectionKey}
              title={sectionKey}
              section={sections[sectionKey].data}
              currentSlug={currentSlug}
              readSections={readSections}
            />
          )
      )}
    </nav>
  );
};

export default Navigation;
