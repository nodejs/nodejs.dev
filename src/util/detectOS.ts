export enum UserOS {
  MAC = 'MAC',
  WIN = 'WIN',
  UNIX = 'UNIX',
  LINUX = 'LINUX',
  MOBILE = 'MOBILE',
  UNKNOWN = 'UNKNOWN',
}

export function detectOS(): UserOS {
  let OS = UserOS.UNKNOWN;
  if (typeof navigator !== `undefined`) {
    if (navigator.appVersion.indexOf('Win') !== -1) OS = UserOS.WIN;
    if (navigator.appVersion.indexOf('Mac') !== -1) OS = UserOS.MAC;
    if (navigator.appVersion.indexOf('X11') !== -1) OS = UserOS.UNIX;
    if (navigator.appVersion.indexOf('Linux') !== -1) OS = UserOS.LINUX;
    // not currently checking for mobile devices
  }
  return OS;
}
