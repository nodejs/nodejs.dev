import React from 'react';
import './Banner.scss';
import config from '../../config.json';

const Banner = (): JSX.Element | null => {
  const {
    banners: {
      index: { text, link, visible },
      bannerBtnText,
    },
  } = config;

  return visible ? (
    <div className="banner">
      <p>
        <a href={link}>
          <button className="bannerButton" type="button">
            {bannerBtnText}
          </button>
        </a>
        {text}
      </p>
    </div>
  ) : null;
};

export default Banner;
