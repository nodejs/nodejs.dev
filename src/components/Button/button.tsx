import React from 'react';
import { Link } from '../';

import styles from './button.module.scss';

interface ButtonProps {
  children: JSX.Element[] | JSX.Element | string;
  type?: 'primary' | 'secondary' | 'default';
  disabled?: boolean;
  to?: string;
  alt?: string;
  onClick?: () => {};
  className?: string;
}

const Button = (props: ButtonProps) => {
  const { children, type, disabled, to, onClick, className, alt } = props;
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
        title={alt}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={[
        styles.button,
        styles[disabled ? 'default' : type || 'primary'],
        className,
      ].join(' ')}
      disabled={disabled}
      onClick={onClick}
      title={alt}
    >
      {children}
    </button>
  );
};

export default Button;
