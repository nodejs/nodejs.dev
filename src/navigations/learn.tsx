import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { NavigationComponents } from '../components';
import { useNavigationContainer } from '../hooks/useNavigationContainer';
import { useNavigationSection } from '../hooks/useNavigationSection';
import { useReadSections } from '../hooks/useReadSections';
import { NavigationData, NavigationSectionData } from '../types';
import styles from './learn.module.scss';

const LearnNavigationSection = ({
  title,
  section,
  children,
  currentSlug,
}: React.PropsWithChildren<NavigationSectionData>) => {
  const { isSectionOpen, toggleSection } = useNavigationSection({
    section,
    currentSlug,
  });

  const titleClassNames = classnames('t-body2', styles.title);

  const sectionTitle = (
    <button
      type="button"
      className={titleClassNames}
      onClick={toggleSection}
      aria-expanded={isSectionOpen}
    >
      <span>{title}</span>
      <FontAwesomeIcon icon={isSectionOpen ? faCaretDown : faCaretUp} />
    </button>
  );

  return (
    <NavigationComponents.NavigationSection
      label={title}
      isOpen={isSectionOpen}
      title={sectionTitle}
      content={children}
    />
  );
};

interface Props {
  sections: NavigationData;
  currentSlug: string;
}

const LearnNavigation = ({ sections, currentSlug }: Props) => {
  const { isRead } = useReadSections({ sections, currentSlug });

  const { onClick, renderContainer, renderSections } =
    useNavigationContainer('Learn Navigation');

  const getExtraClasses = (slug: string) =>
    classnames(styles.item, {
      [styles.itemActive]: slug === currentSlug,
      [styles.itemDone]: isRead(slug),
    });

  const navigationSections = renderSections(sections).map(([key, data]) => (
    <LearnNavigationSection
      key={key}
      title={key}
      section={data}
      currentSlug={currentSlug}
    >
      {data.map(item => (
        <NavigationComponents.NavigationItem
          key={item.slug}
          title={item.title}
          slug={item.slug}
          isActive={item.slug === currentSlug}
          extraClasses={getExtraClasses(item.slug)}
          onClick={onClick}
        />
      ))}
    </LearnNavigationSection>
  ));

  return renderContainer({ children: navigationSections });
};

export default LearnNavigation;
