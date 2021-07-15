import React from 'react';
import { render, screen } from '@testing-library/react';
import Banner from '..';
import { BannersIndex } from '../../../types';

const bannersIndex: BannersIndex = {
  endDate: '',
  link: 'test/banner/link',
  text: 'Test banner text',
  startDate: '',
};

describe('Tests for Header component', () => {
  it('renders when today between startDate and endDate', () => {
    const beforeToday = new Date();
    beforeToday.setDate(beforeToday.getDate() - 1);
    const afterToday = new Date();
    afterToday.setDate(afterToday.getDate() + 1);

    bannersIndex.startDate = beforeToday.toISOString();
    bannersIndex.endDate = afterToday.toISOString();

    render(<Banner bannersIndex={bannersIndex} />);

    const bannerText = screen.getByText(bannersIndex.text);
    expect(bannerText).toBeInTheDocument();
  });
  it('does not render when today before startDate', () => {
    const beforeToday = new Date();
    beforeToday.setDate(beforeToday.getDate() + 1);
    const afterToday = new Date();
    afterToday.setDate(afterToday.getDate() + 2);

    bannersIndex.startDate = beforeToday.toISOString();
    bannersIndex.endDate = afterToday.toISOString();

    render(<Banner bannersIndex={bannersIndex} />);

    const bannerText = screen.queryByText(bannersIndex.text);
    expect(bannerText).not.toBeInTheDocument();
  });
  it('does not render when today after endDate', () => {
    const beforeToday = new Date();
    beforeToday.setDate(beforeToday.getDate() - 2);
    const afterToday = new Date();
    afterToday.setDate(afterToday.getDate() - 1);

    bannersIndex.startDate = beforeToday.toISOString();
    bannersIndex.endDate = afterToday.toISOString();

    render(<Banner bannersIndex={bannersIndex} />);

    const bannerText = screen.queryByText(bannersIndex.text);
    expect(bannerText).not.toBeInTheDocument();
  });
});
