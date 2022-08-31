import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import NavigationSection from '../../components/NavigationSection';
import { NavigationSectionData, NavigationSectionItem } from '../../types';
import styles from './index.module.scss';

interface Props {
  sections: NavigationSectionData;
  currentSlug: string;
  label: string;
  category: string;
  isApiDocs?: boolean;
  children?: JSX.Element;
}

const Navigation = ({
  sections,
  currentSlug,
  label,
  category,
  isApiDocs,
  children,
}: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = (): void => setIsOpen(!isOpen);

  const navigationClasses = classnames(styles.navigation, {
    [styles.navigationFixed]: isOpen,
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
      <button type="button" className={styles.navigationOpen} onClick={toggle}>
        <FormattedMessage id="containers.navigation.title" />
      </button>
      {children}
      {Object.keys(sections).map(
        (sectionKey: string): false | JSX.Element =>
          sections[sectionKey].category === category && (
            <NavigationSection
              key={sectionKey}
              title={sectionKey}
              section={sections[sectionKey].data}
              currentSlug={currentSlug}
              readSections={readSections}
              isApiDocs={isApiDocs}
            />
          )
      )}
    </nav>
  );
};

export default Navigation;
