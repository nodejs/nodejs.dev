import React from 'react';

import { ApiComponentData } from '../../types';
import AddedIn from './Components/AddedIn';
import Changes from './Components/Changes';
import SourceLink from './Components/SourceLink';
import Stability from './Components/Stability';

interface Props {
  data: ApiComponentData;
  version: string;
}

const DocsApiComponent = ({ data, version }: Props): JSX.Element | null => {
  if (data.changes && data.added) {
    return <Changes added={data.added} changes={data.changes} />;
  }

  if (data.added) {
    return <AddedIn added={data.added} />;
  }

  if (data.introduced_in) {
    return <AddedIn added={data.introduced_in} />;
  }

  if (data.stability) {
    return <Stability stability={data.stability} />;
  }

  if (data.source_link) {
    return (
      <SourceLink
        sourceName={data.source_link}
        sourceLink={`https://github.com/nodejs/node/blob/${version}/${data.source_link}`}
      />
    );
  }

  return null;
};

export default DocsApiComponent;
