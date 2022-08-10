import React, { useRef } from 'react';
import {
  useElementPositionAndSize,
  ElementPositionAndSize,
} from '../../hooks/useElementPositionAndSize';
import './Dropdown.scss';

export interface DropdownItem {
  title: string;
  label: string;
  onClick: () => void;
  active?: boolean;
}

interface Props<T> {
  items: Array<DropdownItem>;
  shouldShow: boolean;
  elementRef: React.RefObject<T>;
}

const computeDropdownStyles = (
  outerElement: ElementPositionAndSize,
  dropdownWidth: number,
  shouldShow: boolean
) => {
  // this calculation is done by using the initial position of the reference element
  // minus the width of the dropdown and minus an extra coefficient to account for
  // which results on the dropdown hovering exactly where the element starts
  // @TODO introduce a calculation of where the element should render (before or after the element)
  // @TODO for very small screens the dropdown should fill the whole screen
  const left = outerElement.x - dropdownWidth + outerElement.width - 10;

  // this calculation is done by using the initial position of the reference element
  // plus the height of the reference element minus an extra coefficient to account for
  // which results on the dropdown hovering exactly below where the element starts
  // note.: this doesn't check if the window height is big enough to handle the dropdown
  // @TODO introduce a calculation of where the element should render (above or below the element)
  // @TODO for very small screens the dropdown should fill the whole screen
  const top = outerElement.y + outerElement.height - 15;

  // We don't need to make the element completely invisibile (display: none) just hiding it
  // should be more than enough to hide the element
  const visibility: 'visible' | 'hidden' = shouldShow ? 'visible' : 'hidden';

  return { left, top, visibility };
};

const Dropdown = <T extends HTMLElement>({
  items,
  shouldShow,
  elementRef,
}: Props<T>): JSX.Element | null => {
  const outerElementPosition = useElementPositionAndSize(elementRef);

  const dropdownRef = useRef<HTMLUListElement>(null);

  const mappedElements = items.map(item => {
    const extraStyles = {
      fontWeight: (item.active ? 'bold' : 'normal') as 'bold' | 'normal',
    };

    return (
      <li key={`dropdown-item-${item.label}`}>
        <button
          style={extraStyles}
          onClick={item.onClick}
          onKeyDown={item.onClick}
          type="button"
        >
          {item.title}
        </button>
      </li>
    );
  });

  const dropdownWidth = dropdownRef.current?.offsetWidth || 0;

  const listStyle = computeDropdownStyles(
    outerElementPosition,
    dropdownWidth,
    shouldShow
  );

  return (
    <ul ref={dropdownRef} className="dropdownList" style={listStyle}>
      {mappedElements}
    </ul>
  );
};

export default Dropdown;
