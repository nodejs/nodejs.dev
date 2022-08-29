import React from 'react';

import { DocsApiData } from '../../types';

interface Props {
  data: DocsApiData;
}

const DocsApiComponent = (props: Props) => {
  console.warn(props.data);

  return <></>;
};

export default DocsApiComponent;
