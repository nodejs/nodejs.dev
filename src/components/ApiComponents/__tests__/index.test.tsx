import { getApiComponents } from '..';
import { ApiComponentData } from '../../../types';

describe('ApiComponents component', (): void => {
  const version = 'v0';

  it('renders correctly', (): void => {
    const components = getApiComponents({ fullVersion: version });
    const component = components({ data: {} });
    expect(component).toBeNull();
  });

  it('renders Components Changes correctly', (): void => {
    const components = getApiComponents({ fullVersion: version });
    const data: ApiComponentData = {
      update: {
        type: 'added',
        version: [version],
      },
      changes: [
        {
          version,
          'pr-url': 'https://test.com',
          description: 'test',
        },
      ],
    };
    const component = components({ data });
    expect(component).toMatchSnapshot();
  });

  it('renders Components Span correctly', (): void => {
    const components = getApiComponents({ fullVersion: version });
    const data: ApiComponentData = {
      update: {
        type: 'added',
        version: [version],
      },
    };
    const component = components({ data });
    expect(component).toMatchSnapshot();
  });

  it('renders Components SourceLink correctly', (): void => {
    const components = getApiComponents({ fullVersion: version });
    const data: ApiComponentData = {
      source_link: 'https://test.com',
    };
    const component = components({ data });
    expect(component).toMatchSnapshot();
  });
});
