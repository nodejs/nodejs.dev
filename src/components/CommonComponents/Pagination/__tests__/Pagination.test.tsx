import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '..';

describe('Pagination component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Pagination currentPage={1} pageCount={10} marginPageCount={1} />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders only next prev buttons', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        pageCount={10}
        marginPageCount={1}
        showPages={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with wrapperClassName', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        pageCount={10}
        marginPageCount={1}
        wrapperClassName="wrapper"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('handles onPageChange', async () => {
    const onClick = jest.fn();
    render(
      <Pagination
        currentPage={1}
        pageCount={10}
        marginPageCount={1}
        wrapperClassName="wrapper"
        onPageChange={onClick}
      />
    );
    const linkItem: Element = screen.getAllByRole('link')[0] as Element;
    await userEvent.click(linkItem);
    expect(onClick).toHaveBeenCalled();
  });

  it('handles hrefBuilder', () => {
    const hrefBuilder = jest.fn((page: number) => `/page/${page}`);
    const { container } = render(
      <Pagination
        currentPage={2}
        hrefBuilder={hrefBuilder}
        pageCount={10}
        marginPageCount={1}
        wrapperClassName="wrapper"
      />
    );

    expect(hrefBuilder).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
