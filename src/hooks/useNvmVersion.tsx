import { useEffect, useState } from 'react';
import { getLatestNvmVersion } from '../../util-node/getNvmData';

type AsyncState =
  | {
      state: 'loading';
    }
  | { state: 'error' }
  | { state: 'loaded'; nvmVersion: string };

export default function useNvmVersion(): AsyncState {
  const [state, setState] = useState<AsyncState>({ state: 'loading' });
  useEffect(() => {
    getLatestNvmVersion()
      .then(nvmVersion => setState({ state: 'loaded', nvmVersion }))
      .catch(() => setState({ state: 'error' }));
  }, []);
  return state;
}
