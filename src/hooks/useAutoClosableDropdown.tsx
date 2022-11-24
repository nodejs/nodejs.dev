import React, { useEffect, useCallback } from 'react';
import { CommonComponents } from '../components';
import { DropdownItem } from '../types';

export const useAutoClosableDropdown = <T extends HTMLElement>(
  items: Array<DropdownItem>,
  elementRef: React.RefObject<T>
) => {
  const [shouldShow, setShouldShow] = React.useState(false);

  const updateVisibility = useCallback((value: boolean) => {
    setShouldShow(value);
  }, []);

  const hideDropdownIfVisible = useCallback(() => {
    if (shouldShow) {
      updateVisibility(false);
    }
  }, [updateVisibility, shouldShow]);

  useEffect(() => {
    document.addEventListener('click', hideDropdownIfVisible, true);

    return () =>
      document.removeEventListener('click', hideDropdownIfVisible, true);
  }, [hideDropdownIfVisible]);

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
