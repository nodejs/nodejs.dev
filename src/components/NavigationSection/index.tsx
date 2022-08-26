import React, { useState } from 'react';
import classnames from 'classnames';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { NavigationSectionItem } from '../../types';
import NavigationItem from '../NavigationItem';
import styles from './index.module.scss';

interface Props {
  key: string;
  title: string;
  section: NavigationSectionItem[];
  currentSlug: string;
  readSections: Set<NavigationSectionItem['slug']>;
}

const NavigationSection = ({
  title,
  section,
  currentSlug,
  readSections,
}: Props): JSX.Element => {
  const isActive = (item: NavigationSectionItem) => item.slug === currentSlug;
  const [isOpen, setIsOpen] = useState(!!section.find(isActive));
  const isMobile = useMediaQuery('(max-width: 870px)');
  const toggle = (): void => setIsOpen(!isOpen);
  const titleClassNames = classnames('t-body2', styles.navigationSectionTitle);

  return (
    <div className={styles.navigationSection}>
      <div
        className={titleClassNames}
        onClick={toggle}
        onKeyDown={toggle}
        tabIndex={0}
        role="menuitem"
      >
        {title}
        {!isMobile && (
          <i className="material-icons">
            {isOpen ? 'arrow_drop_down' : 'arrow_drop_up'}
          </i>
        )}
      </div>
      <div style={{ display: isOpen || isMobile ? 'block' : 'none' }}>
        {section.map((item: NavigationSectionItem): JSX.Element => {
          const isRead: boolean = readSections.has(item.slug);

          return (
            <NavigationItem
              key={item.slug}
              title={item.title}
              slug={item.slug}
              baseUrl={item.baseUrl}
              isRead={isRead}
              isActive={isActive(item)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NavigationSection;
