import React from 'react';
import classnames from 'classnames';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import { NavigationComponents } from '../components';
import { useNavigationContainer } from '../hooks/useNavigationContainer';
import { NavigationData, NavigationSectionData } from '../types';
import styles from './api.module.scss';

interface Props {
  sections: NavigationData;
  currentSlug: string;
}

const ApiNavigationSection = ({
  title,
  children,
}: React.PropsWithChildren<NavigationSectionData>) => {
  const titleClassNames = classnames('t-body2', styles.title);

  const sectionTitle = (
    <button type="button" className={titleClassNames} aria-expanded>
      <span>
        <OfflineBoltIcon />
        {title}
      </span>
    </button>
  );

  return (
    <NavigationComponents.NavigationSection
      isOpen
      label={title}
      title={sectionTitle}
      content={children}
    />
  );
};

const ApiNavigation = ({
  sections,
  children,
  currentSlug,
}: React.PropsWithChildren<Props>) => {
  const { onClick, renderContainer, renderSections } =
    useNavigationContainer('API Navigation');

  const navigationSections = renderSections(sections).map(([key, data]) => (
    <ApiNavigationSection
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
          extraClasses={styles.item}
          onClick={onClick}
        />
      ))}
    </ApiNavigationSection>
  ));

  return renderContainer({
    children: (
      <>
        {children}
        {navigationSections}
      </>
    ),
  });
};

export default ApiNavigation;
