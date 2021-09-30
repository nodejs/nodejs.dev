import React, { useState } from 'react';
import DownloadToggle from '../src/components/DownloadToggle';

export default {
  title: 'DownloadToggle',
  component: DownloadToggle,
};

export const Root = (): JSX.Element => {
  const [typeRelease, setTypeRelease] = useState('LTS');
  const handleTypeReleaseToggle = (
    selected: React.SetStateAction<string>
  ): void => setTypeRelease(selected);

  return (
    <>
      <DownloadToggle
        selected={typeRelease}
        handleClick={handleTypeReleaseToggle}
      />
      <DownloadToggle
        selected={typeRelease}
        handleClick={handleTypeReleaseToggle}
        showDescription={false}
      />
    </>
  );
};
