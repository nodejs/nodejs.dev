/** Small screen width
 *  If the width of the viewport is lesser than this value
 *  it means that the website is viewed in a tablet or mobile
 */
const MAX_SMALL_SCREEN_WIDTH: number = 1262;

const MAX_MOBILE_SCREEN_WIDTH: number = 720;

const isScreenWithinWidth = (maxWidth: number): boolean => {
  // Get viewport width
  // Source - https://stackoverflow.com/a/8876069/2621400
  const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );

  return w <= maxWidth;
};

export const isSmallScreen = () => isScreenWithinWidth(MAX_SMALL_SCREEN_WIDTH);

export const isMobileScreen = () =>
  isScreenWithinWidth(MAX_MOBILE_SCREEN_WIDTH);
