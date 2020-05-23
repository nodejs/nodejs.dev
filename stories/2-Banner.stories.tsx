import React from 'react';
import Banner from '../src/components/Banner';
import '../src/components/Banner/Banner.scss';

export default {
  title: 'Banner',
  component: Banner,
};
const bannerLink = '#';
export const withoutButton = (): JSX.Element => (
  <div className="banner">
    <p>New security releases now available for all release lines</p>
  </div>
);

export const withButton = (): JSX.Element => (
  <div className="banner">
    <p>
      <a href={bannerLink}>
        <button className="bannerButton" type="button">
          Blog post
        </button>
      </a>
      Testing it out withButton
    </p>
  </div>
);
