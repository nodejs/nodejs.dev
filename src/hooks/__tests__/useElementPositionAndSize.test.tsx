import React, { RefObject } from 'react';
import { render } from '@testing-library/react';
import { useElementPositionAndSize } from '../useElementPositionAndSize';

type HookRendererProps<T> = {
  elementRef: RefObject<T>;
};

describe('useElementPositionAndSize', () => {
  const HookRenderer = <T extends HTMLElement>({
    elementRef,
  }: HookRendererProps<T>): JSX.Element => {
    const result = useElementPositionAndSize(elementRef);

    return <>{JSON.stringify(result)}</>;
  };

  it('should return initial value', () => {
    const elementRef = {
      current: {} as HTMLDivElement,
    } as RefObject<HTMLDivElement>;
    const { container } = render(<HookRenderer elementRef={elementRef} />);

    expect(container).toMatchSnapshot();
  });

  it('should return calculated value', () => {
    const offset = 100;
    const elementRef = {
      current: {
        offsetLeft: offset,
        offsetTop: offset,
        offsetWidth: offset,
        offsetHeight: offset,
      } as HTMLDivElement,
    } as RefObject<HTMLDivElement>;
    const { container } = render(<HookRenderer elementRef={elementRef} />);

    expect(container).toMatchSnapshot();
  });
});
