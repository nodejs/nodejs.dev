import React from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import styles from './index.module.scss';

interface Props {
  isOpen: boolean;
  label: string;
  toggleNavigation: () => void;
}

const NavigationContainer = ({
  label,
  isOpen,
  children,
  toggleNavigation,
}: React.PropsWithChildren<Props>) => {
  const navigationClasses = classnames(styles.navigation, {
    [styles.navigationFixed]: isOpen,
  });

  return (
    <nav aria-label={label} className={navigationClasses} id="main-navigation">
      <button
        type="button"
        className={styles.navigationOpen}
        onClick={toggleNavigation}
        aria-expanded={isOpen}
      >
        <FormattedMessage id="containers.navigation.title" />
      </button>
      {children}
    </nav>
  );
};

export default NavigationContainer;
