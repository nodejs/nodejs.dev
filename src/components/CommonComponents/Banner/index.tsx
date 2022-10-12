import React, { useMemo } from 'react';
import { sanitize } from 'isomorphic-dompurify';
import { dateIsBetween } from '../../../util/dateIsBetween';
import { isAbsoluteUrl } from '../../../util/isAbsoluteUrl';
import { BannersIndex } from '../../../types';
import config from '../../../config.json';
import styles from './index.module.scss';

export interface BannerProps {
  bannersIndex: BannersIndex;
}

const useTextContent = ({ text, link }: BannersIndex) =>
  useMemo(() => {
    if (text) {
      return (
        <p>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <button type="button">{config.bannerBtnText}</button>
          </a>
          {text}
        </p>
      );
    }

    return null;
  }, [text, link]);

const useHtmlContent = ({ html, link }: BannersIndex) =>
  useMemo(() => {
    if (html) {
      const sanitizedHtml = sanitize(html);

      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      );
    }

    return null;
  }, [html, link]);

const Banner = ({ bannersIndex }: BannerProps): JSX.Element | null => {
  const showBanner = dateIsBetween(
    bannersIndex.startDate,
    bannersIndex.endDate
  );

  const link = !isAbsoluteUrl(bannersIndex.link)
    ? `http://nodejs.org/${bannersIndex.link}`
    : bannersIndex.link;

  const textContent = useTextContent({ ...bannersIndex, link });
  const htmlContent = useHtmlContent({ ...bannersIndex, link });

  if (showBanner) {
    return (
      <div className={styles.banner}>
        {bannersIndex.text ? textContent : htmlContent}
      </div>
    );
  }

  return null;
};

export default Banner;
