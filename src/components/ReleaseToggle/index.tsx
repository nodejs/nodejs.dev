import React from 'react';

import '../styles/release-toggle.css';

interface Props {
  handleClick: void;
  selected: string;
}

export default function ReleaseToggle({
  handleClick,
  selected,
}: Props): JSX.Element {
  return (
    <label htmlFor={`release-selector-${id}`}>
      <input
        id={`release-selector-${id}`}
        type="checkbox"
        checked={selected}
        onChange={handleClick}
      />
      {selected ? 'lts' : 'current'}
    </label>
  );
}
