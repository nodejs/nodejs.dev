import React from 'react';
import { Link } from '..';

import styles from './button.module.scss';

interface ButtonProps {
  children: JSX.Element[] | JSX.Element | string;
  type?: 'primary' | 'secondary' | 'default';
  shape?: 'rounded';
  disabled?: boolean;
  to?: string;
  alt?: string;
  onClick?: () => {};
  className?: string;
}

const Button = (props: ButtonProps): JSX.Element => {
  const {
    children,
    type,
    disabled,
    shape,
    to,
    onClick,
    className,
    alt,
  } = props;
  if (to && !onClick) {
    return (
      <Link
        to={to}
        className={[
          styles.button,
          styles[disabled ? 'disabled' : type || 'primary'],
          shape && styles[shape],
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
        styles[disabled ? 'disabled' : type || 'primary'],
        shape && styles[shape],
        className,
      ].join(' ')}
      disabled={disabled}
      onClick={onClick}
      title={alt}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
