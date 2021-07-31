import React from 'react';
import Banner from '../src/components/Banner';
import '../src/components/Banner/Banner.scss';
import '../src/styles/tokens.scss';
import '../src/styles/layout.scss';
import '../src/styles/mobile.scss';
import { BannersIndex } from '../src/types';

const endDate = new Date();
endDate.setDate(endDate.getDate() + 1);
const bannersIndex: BannersIndex = {
  endDate: endDate.toISOString(),
  link: 'test/banner/link',
  text: 'Test banner text',
  startDate: new Date().toISOString(),
};

export default {
  title: 'Banner',
  component: Banner,
};
export const root = (): JSX.Element => <Banner bannersIndex={bannersIndex} />;
