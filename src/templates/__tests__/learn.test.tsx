import React from 'react';
import { render } from '@testing-library/react';
import LearnTemplate from '../learn';
import {
  createLearnPageData,
  createLearnPageContext,
} from '../../__fixtures__/page';

describe('Learn Template', () => {
  it('renders correctly', () => {
    const learnPageData = createLearnPageData();
    const learnPageContext = createLearnPageContext();

    const { container } = render(
      <LearnTemplate
        data={learnPageData.data}
        pageContext={learnPageContext}
        location={window.location}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
