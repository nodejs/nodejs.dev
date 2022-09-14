import React, { useState } from 'react';
import classnames from 'classnames';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
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
  isApiDocs?: boolean;
  onClick?: (event: React.MouseEvent<HTMLLinkElement>) => void;
}

const NavigationSection = ({
  title,
  section,
  currentSlug,
  readSections,
  isApiDocs,
  onClick,
}: Props): JSX.Element => {
  const isActive = (item: NavigationSectionItem) => item.slug === currentSlug;
  const [isOpen, setIsOpen] = useState(!!section.find(isActive));
  const isMobile = useMediaQuery('(max-width: 870px)');
  const toggle = (): void => setIsOpen(!isOpen);

  const titleClassNames = classnames('t-body2', styles.navigationSectionTitle, {
    [styles.navigationSectionApiTitle]: isApiDocs,
  });

  const navigationSectionClasses = classnames(styles.navigationSection);

  return (
    <div className={navigationSectionClasses}>
      <div
        className={titleClassNames}
        onClick={toggle}
        onKeyDown={toggle}
        tabIndex={0}
        role="menuitem"
      >
        <span>
          {isApiDocs && <OfflineBoltIcon />}
          {title}
        </span>
        {!isMobile &&
          (isOpen ? (
            <ArrowDropDownIcon style={{ padding: 0 }} />
          ) : (
            <ArrowDropUpIcon style={{ padding: 0 }} />
          ))}
      </div>
      <div style={{ display: isOpen || isMobile ? 'block' : 'none' }}>
        {section.map((item: NavigationSectionItem): JSX.Element => {
          const isRead: boolean = readSections.has(item.slug);

          return (
            <NavigationItem
              key={item.slug}
              title={item.title}
              slug={item.slug}
              isRead={isRead}
              isActive={isActive(item)}
              isApiDocs={isApiDocs}
              onClick={onClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NavigationSection;
