import { useEffect, useState } from 'react';
import { detectOS, UserOS } from '../util/detectOS';
import downloadUrlByOS from '../util/downloadUrlByOS';

export const useDetectOs = () => {
  const [userOS, setUserOS] = useState<UserOS>(UserOS.UNKNOWN);
  const [bitness, setBitness] = useState<string>('');

  useEffect(() => {
    setUserOS(detectOS);
    try {
      // This is necessary to detect Windows 11 on Edge.
      // [MDN](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues)
      // [MSFT](https://learn.microsoft.com/en-us/microsoft-edge/web-platform/how-to-detect-win11)
      // @ts-expect-error no types yet because this API is experimental
      navigator.userAgentData
        .getHighEntropyValues(['bitness'])
        .then((ua: { bitness: string }) => {
          setBitness(ua.bitness);
        });
    } catch (e) {
      // Ignore errors since not every browser supports this API
    }
  }, []);

  return {
    userOS,
    getDownloadLink: (version: string) =>
      downloadUrlByOS(userOS, version, bitness),
  };
};
