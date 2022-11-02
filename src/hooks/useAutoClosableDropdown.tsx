import React, { useEffect, useRef } from 'react';
import { CommonComponents } from '../components';
import { DropdownItem } from '../types';

export const useAutoClosableDropdown = <T extends HTMLElement>(
  items: Array<DropdownItem>,
  elementRef: React.RefObject<T>
) => {
  const [shouldShow, setShouldShow] = React.useState(false);

  // this is used as an event listener doesn't have access to the state
  const shouldShowRef = useRef(shouldShow);

  const updateVisibility = (value: boolean) => {
    setShouldShow(value);
    shouldShowRef.current = value;
  };

  const hideDropdownIfVisible = () => {
    if (shouldShowRef.current === true) {
      updateVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', hideDropdownIfVisible, true);

    return () =>
      document.removeEventListener('click', hideDropdownIfVisible, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    renderDropdown: (
      <CommonComponents.Dropdown
        items={items}
        elementRef={elementRef}
        shouldShow={shouldShow}
      />
    ),
    visible: shouldShow,
    showDropdown: updateVisibility,
  };
};
