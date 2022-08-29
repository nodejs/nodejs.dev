import React from 'react';

import { ApiComponentData } from '../../types';
import AddedIn from './Components/AddedIn';
import Changes from './Components/Changes';
import SourceLink from './Components/SourceLink';

interface Props {
  data: ApiComponentData;
  version: string;
}

const DocsApiComponent = (props: Props) => {
  if (props.data.changes && props.data.added) {
    return <Changes added={props.data.added} changes={props.data.changes} />;
  }

  if (props.data.added) {
    return <AddedIn added={props.data.added} />;
  }

  if (props.data.source_link) {
    return (
      <SourceLink
        sourceName={props.data.source_link}
        sourceLink={`https://github.com/nodejs/node/blob/${props.version}/${props.data.source_link}`}
      />
    );
  }

  return <></>;
};

export default DocsApiComponent;
