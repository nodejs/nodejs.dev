import { useEffect } from 'react';
import { scroller } from 'react-scroll';

interface Props {
  element: string;
  isActive?: boolean;
  containerId?: string;
  smooth?: boolean;
  offset?: number;
}

export const useScrollToElement = ({ element, isActive, ...p }: Props) => {
  useEffect(
    () => (isActive ? scroller.scrollTo(element, p) : undefined),
    [isActive]
  );
};
