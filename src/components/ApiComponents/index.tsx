import React from 'react';

import { ApiComponentData } from '../../types';
import * as Components from './Components';

interface Props {
  data: ApiComponentData;
  version: string;
}

const Metadata = ({ data, version }: Props): JSX.Element | null => {
  if (data.changes && data.update) {
    return <Components.Changes changes={data.changes} update={data.update} />;
  }

  if (data.update) {
    return (
      <Components.Span version={data.update.version} type={data.update.type} />
    );
  }

  if (data.stability) {
    return <Components.Stability stability={data.stability} />;
  }

  if (data.source_link) {
    return (
      <Components.SourceLink
        sourceName={data.source_link}
        sourceLink={`https://github.com/nodejs/node/blob/${version}/${data.source_link}`}
      />
    );
  }

  return null;
};

export { Metadata, Components };
