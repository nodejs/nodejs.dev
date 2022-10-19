import React from 'react';
import { render } from '@testing-library/react';
import { ApiLink, H5, H4, H3, JsonLink } from '..';

describe('ApiComponents Components', (): void => {
  it('renders ApiLink component correctly', () => {
    const { container } = render(
      <ApiLink href="/test/datatag-tagc--">
        <br />
      </ApiLink>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders H5 component correctly', () => {
    const { container } = render(<H5 id="/test/tag-tagm--" />);
    expect(container).toMatchSnapshot();
  });

  it('renders H4 component correctly', () => {
    const id = '<DataTag tag="M" />';
    const { container } = render(<H4 id={id} />);
    expect(container).toMatchSnapshot();
  });

  it('renders H3 component correctly', () => {
    const id = '<Tag tag="C" />';
    const { container } = render(<H3 id={id} />);
    expect(container).toMatchSnapshot();
  });

  it('renders JsonLink component correctly', () => {
    const { container } = render(<JsonLink fileName="cli" version="v18" />);
    expect(container).toMatchSnapshot();
  });
});
