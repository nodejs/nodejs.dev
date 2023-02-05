import React from 'react';

import { ApiComponentData } from '../../types';
import * as Components from './Components';

interface MetadataProps {
  data: ApiComponentData;
}

interface ApiComponentsProps {
  fullVersion: string;
}

const getApiComponents = ({ fullVersion }: ApiComponentsProps) => {
  const Metadata = ({ data }: MetadataProps): JSX.Element | null => {
    const { changes, update, source_link: sourceLink } = data;

    if (changes && update) {
      return <Components.Changes changes={changes} update={update} />;
    }

    if (update) {
      return <Components.Span version={update.version} type={update.type} />;
    }

    if (sourceLink) {
      return <Components.SourceLink version={fullVersion} link={sourceLink} />;
    }

    return null;
  };

  return Metadata;
};

export { getApiComponents, Components };
