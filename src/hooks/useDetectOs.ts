import { useEffect, useState } from 'react';
import { detectOS, UserOS } from '../util/detectOS';
import downloadUrlByOS from '../util/downloadUrlByOS';

export const useDetectOs = () => {
  const [userOS, setUserOS] = useState<UserOS>(UserOS.UNKNOWN);

  useEffect(() => setUserOS(detectOS), []);

  return {
    userOS,
    getDownloadLink: (version: string) => downloadUrlByOS(userOS, version),
  };
};
