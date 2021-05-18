import React from 'react';
import './AnimatedPlaceholder.scss';

interface Props {
  children?: JSX.Element;
}

const AnimatedPlaceholder = ({ children }: Props): JSX.Element => {
  return (
    <div className="animated-placeholder">
      {/* Prefer external skeleton structure or render default in case not passed */}
      {children && children}
      {!children && (
        <>
          <div className="animated-placeholder__image" />
          <div className="animated-placeholder__text">
            <div className="animated-placeholder__text-line" />
            <div className="animated-placeholder__text-line" />
            <div className="animated-placeholder__text-line" />
            <div className="animated-placeholder__text-line" />
          </div>
        </>
      )}
    </div>
  );
};

export default AnimatedPlaceholder;
