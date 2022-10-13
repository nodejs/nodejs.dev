import React from 'react';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import NavigationItem from '../components/NavigationItem';
import NavigationSection from '../components/NavigationSection';
import { useNavigationContainer } from '../hooks/useNavigationContainer';
import { NavigationItemData } from '../types';
import styles from './blog.module.scss';

interface Props {
  categories: NavigationItemData[];
  currentCategory: string;
}

const BlogNavigation = ({ categories, currentCategory }: Props) => {
  const { onClick, renderContainer } = useNavigationContainer('API Navigation');

  const intl = useIntl();

  const title = intl.formatMessage({ id: 'navigation.blog.categories' });

  const getExtraClasses = (slug: string) =>
    classnames(styles.item, {
      [styles.itemActive]: slug === currentCategory,
    });

  const navigationContent = categories.map(item => (
    <NavigationItem
      key={item.slug}
      title={intl.formatMessage({ id: item.title })}
      slug={item.slug}
      isActive={item.slug === currentCategory}
      extraClasses={getExtraClasses(item.slug)}
      onClick={onClick}
    />
  ));

  const navigationTitle = <strong className={styles.title}>{title}</strong>;

  return renderContainer({
    children: (
      <NavigationSection
        isOpen
        label={title}
        title={navigationTitle}
        content={navigationContent}
      />
    ),
  });
};

export default BlogNavigation;
