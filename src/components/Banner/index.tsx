import React from 'react';
import './Banner.scss';
import { dateIsBetween } from '../../util/dateIsBetween';
import config from '../../config.json';
import { BannersIndex } from '../../types';

export interface BannerProps {
  bannersIndex: BannersIndex;
}

const Banner = ({
  bannersIndex: { startDate, endDate, text, link },
}: BannerProps): JSX.Element | null => {
  const showBanner = dateIsBetween(startDate, endDate);

  return showBanner ? (
    <div className="banner">
      <p>
        <a
          href={`http://nodejs.org/en/${link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bannerButton" type="button">
            {config.bannerBtnText}
          </button>
        </a>
        {text}
      </p>
    </div>
  ) : null;
};

export default Banner;
