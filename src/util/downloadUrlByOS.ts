import { UserOS } from './detectOS';

export default function downloadUrlByOS(
  userOS: UserOS,
  version: string
): string {
  const baseURL = `https://nodejs.org/dist/${version}`;

  if (userOS === UserOS.MOBILE) {
    return baseURL;
  }

  if (userOS === UserOS.MAC) {
    return `${baseURL}/node-${version}.pkg`;
  }

  if (userOS === UserOS.WIN) {
    return `${baseURL}/node-${version}-x64.msi`;
  }

  return `${baseURL}/node-${version}.tar.gz`;
}
