import React from 'react';
import { render } from '../../../../test-utils.js';
import GetStartedSection from '..';

describe('Tests for Footer component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <GetStartedSection
        beginnerGuideBodyText="Mock Text"
        beginnerGuideHeaderText="Mock Text"
        doMoreWithNodeBodyText="Mock Text"
        doMoreWithNodeHeaderText="Mock Text"
        learnLinkText="Mock Text"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
