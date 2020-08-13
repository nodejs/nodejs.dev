import React from 'react';
import ReleaseCards from '../src/components/ReleaseCards';
import { useReleaseHistory } from '../src/hooks';
import '../src/styles/tokens.scss';
import '../src/styles/layout.scss';
import '../src/styles/mobile.scss';

export default {
  title: 'ReleaseCards',
  component: ReleaseCards,
};

const ReleaseCardExample = props => {
  const releaseHistory = useReleaseHistory().slice(0, 10);

  return <ReleaseCards line={releaseHistory[0]} />;
};

export const root = (): JSX.Element => <ReleaseCardExample />;
