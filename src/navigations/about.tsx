import React from 'react';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import NavigationItem from '../components/NavigationItem';
import NavigationSection from '../components/NavigationSection';
import { useNavigationContainer } from '../hooks/useNavigationContainer';
import { AboutNavigationKeys } from '../types/pages/about';
import { NavigationSectionData } from '../types';
import styles from './about.module.scss';

const aboutNavigation = {
  'components.sideBar.section.about': [
    {
      title: 'components.sideBar.items.governance',
      slug: AboutNavigationKeys.governance,
    },
    {
      title: 'components.sideBar.items.releases',
      slug: AboutNavigationKeys.releases,
    },
    {
      title: 'components.sideBar.items.resources',
      slug: AboutNavigationKeys.resources,
    },
    {
      title: 'components.sideBar.items.privacy',
      slug: AboutNavigationKeys.privacy,
    },
    {
      title: 'components.sideBar.items.security',
      slug: AboutNavigationKeys.security,
    },
  ],
  'components.sideBar.section.getInvolved': [
    {
      title: 'components.sideBar.items.collabSummit',
      slug: AboutNavigationKeys.collabSummit,
    },
    {
      title: 'components.sideBar.items.contribute',
      slug: AboutNavigationKeys.contribute,
    },
    {
      title: 'components.sideBar.items.codeOfConduct',
      slug: AboutNavigationKeys.codeOfConduct,
    },
  ],
  'components.sideBar.section.download': [
    {
      title: 'components.sideBar.items.packageManager',
      slug: AboutNavigationKeys.packageManager,
    },
    {
      title: 'components.sideBar.items.previousReleases',
      slug: AboutNavigationKeys.previousReleases,
    },
  ],
};

const AboutNavigationSection = ({
  title,
  children,
}: React.PropsWithChildren<NavigationSectionData>) => {
  const titleClassNames = classnames('t-body2', styles.title);

  return (
    <NavigationSection
      isOpen
      title={
        <button type="button" className={titleClassNames} aria-expanded>
          <span>{title}</span>
        </button>
      }
      content={
        <div role="region" style={{ display: 'block' }}>
          {children}
        </div>
      }
    />
  );
};

interface Props {
  currentSlug: string;
}

const AboutNavigation = ({ currentSlug }: Props) => {
  const { onClick, renderContainer, renderSections } =
    useNavigationContainer('About Navigation');

  const intl = useIntl();

  const navigationSections = renderSections(aboutNavigation).map(
    ([key, data]) => (
      <AboutNavigationSection
        key={key}
        title={intl.formatMessage({ id: key })}
        section={data}
        currentSlug={currentSlug}
      >
        {data.map(item => (
          <NavigationItem
            key={item.slug}
            title={intl.formatMessage({ id: item.title })}
            slug={item.slug}
            isActive={item.slug === currentSlug}
            onClick={onClick}
          />
        ))}
      </AboutNavigationSection>
    )
  );

  return renderContainer({ children: navigationSections });
};

export default AboutNavigation;
