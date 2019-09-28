import React from 'react';
import Link from '../Link/Link';

import styles from './button.module.scss';

interface ButtonProps {
  children: JSX.Element[] | JSX.Element | string;
  type?: 'primary' | 'secondary' | 'default';
  disabled?: boolean;
  to?: string;
  onClick?: () => {};
  className?: string;
}

const Button = (props: ButtonProps) => {
  const { children, type, disabled, to, onClick, className } = props;
  if (to && !onClick) {
    return (
      <Link
        to={to}
        className={[
          styles.button,
          styles[disabled ? 'default' : type || 'primary'],
          className,
        ].join(' ')}
        disabled={disabled}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={[
          styles.button,
          styles[disabled ? 'default' : type || 'primary'],
          className,
        ].join(' ')}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};

export default Button;
