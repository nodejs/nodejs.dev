import React from 'react';
import { render } from '@testing-library/react';
import RandomContributor from '..';
import { useOnScreen } from '../../../hooks/useOnScreen';
import { useNodeJsContributorsApi } from '../../../hooks/useNodeJsContributorsApi';
import { createRandomContributorViewData } from '../../../../test/__fixtures__/hooks';

jest.mock('../../../hooks/useOnScreen');
jest.mock('../../../hooks/useNodeJsContributorsApi');

describe('RandomContributor component', () => {
  it('should render correctly', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useOnScreen.mockReturnValue(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useNodeJsContributorsApi.mockReturnValue(createRandomContributorViewData());

    const { container } = render(<RandomContributor />);
    expect(container).toMatchSnapshot();
  });
});
