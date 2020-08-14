import React from 'react';
import ReleaseTable from '../src/components/ReleaseTable';
import { useReleaseHistory } from '../src/hooks';
import '../src/styles/tokens.scss';
import '../src/styles/layout.scss';
import '../src/styles/mobile.scss';

export default {
  title: 'ReleaseTable',
  component: ReleaseTable,
};

const ReleaseCardExample = props => {
  const releaseHistory = useReleaseHistory().slice(0, 10);

  return <ReleaseTable releases={releaseHistory} />;
};

export const root = (): JSX.Element => <ReleaseCardExample />;
