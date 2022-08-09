import React from 'react';
import { dateIsBetween } from '../../util/dateIsBetween';
import config from '../../config.json';
import { BannersIndex } from '../../types';
import { isAbsoluteUrl } from '../../util/isAbsoluteUrl';

import './Banner.scss';

export interface BannerProps {
  bannersIndex: BannersIndex;
}

const useTextContent = ({ text, link }: BannersIndex) => {
  if (text) {
    return (
      <p>
        <a
          href={isAbsoluteUrl(link) ? link : `http://nodejs.org/${link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bannerButton" type="button">
            {config.bannerBtnText}
          </button>
        </a>
        {text}
      </p>
    );
  }

  return null;
};

const useHtmlContent = ({ html, link }: BannersIndex) => {
  if (html) {
    // @note this is a workaround and it would be better if nodejs.org
    // repository would provide absolute urls instead of relative for us
    const replaceLocalLinksToNodejsOrg = html.replace(
      "'/static/",
      "'http://nodejs.org/static/"
    );

    return (
      <a
        href={isAbsoluteUrl(link) ? link : `http://nodejs.org/${link}`}
        target="_blank"
        rel="noopener noreferrer"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: replaceLocalLinksToNodejsOrg }}
      />
    );
  }

  return null;
};

const Banner = ({ bannersIndex }: BannerProps): JSX.Element | null => {
  const showBanner = dateIsBetween(
    bannersIndex.startDate,
    bannersIndex.endDate
  );

  const textContent = useTextContent(bannersIndex);
  const htmlContent = useHtmlContent(bannersIndex);

  if (showBanner) {
    return (
      <div className="banner">
        {bannersIndex.text ? textContent : htmlContent}
      </div>
    );
  }

  return null;
};

export default Banner;
