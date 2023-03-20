import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import classnames from 'classnames';
import { NavigationComponents } from '../components';
import { useNavigationContainer } from '../hooks/useNavigationContainer';
import { AboutNavigationKeys } from '../types/pages/about';
import { NavigationSectionData } from '../types';
import styles from './about.module.scss';

const aboutNavigation = {
  'navigation.about.section.about': [
    {
      title: 'navigation.about.section.about',
      slug: AboutNavigationKeys.about,
    },
    {
      title: 'navigation.about.items.governance',
      slug: AboutNavigationKeys.governance,
    },
    {
      title: 'navigation.about.items.releases',
      slug: AboutNavigationKeys.releases,
    },
    {
      title: 'navigation.about.items.branding',
      slug: AboutNavigationKeys.branding,
    },
    {
      title: 'navigation.about.items.privacy',
      slug: AboutNavigationKeys.privacy,
    },
    {
      title: 'navigation.about.items.security',
      slug: AboutNavigationKeys.security,
    },
  ],
  'navigation.about.section.getInvolved': [
    {
      title: 'navigation.about.section.getInvolved',
      slug: AboutNavigationKeys.getInvolved,
    },
    {
      title: 'navigation.about.items.collabSummit',
      slug: AboutNavigationKeys.collabSummit,
    },
    {
      title: 'navigation.about.items.contribute',
      slug: AboutNavigationKeys.contribute,
    },
    {
      title: 'navigation.about.items.codeOfConduct',
      slug: AboutNavigationKeys.codeOfConduct,
    },
  ],
  'navigation.about.section.download': [
    {
      title: 'navigation.about.section.download',
      slug: AboutNavigationKeys.download,
    },
    {
      title: 'navigation.about.items.packageManager',
      slug: AboutNavigationKeys.packageManager,
    },
    {
      title: 'navigation.about.items.previousReleases',
      slug: AboutNavigationKeys.previousReleases,
    },
  ],
};

const AboutNavigationSection = ({
  title,
  children,
}: React.PropsWithChildren<NavigationSectionData>) => {
  const titleClassNames = classnames('t-body2', styles.title);

  const sectionTitle = (
    <button type="button" className={titleClassNames} aria-expanded>
      <span>{title}</span>
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

interface Props {
  currentSlug: string;
}

const AboutNavigation = ({
  currentSlug,
  intl,
}: Props & WrappedComponentProps) => {
  const { onClick, renderContainer, renderSections } =
    useNavigationContainer('About Navigation');

  const navigationSections = renderSections(aboutNavigation).map(
    ([key, data]) => (
      <AboutNavigationSection
        key={key}
        title={intl.formatMessage({ id: key })}
        section={data}
        currentSlug={currentSlug}
      >
        {data.map(item => (
          <NavigationComponents.NavigationItem
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

export default injectIntl(AboutNavigation);
