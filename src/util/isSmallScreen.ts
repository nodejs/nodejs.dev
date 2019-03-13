/** Small screen width
 *  If the width of the viewport is lesser than this value
 *  it means that the website is viewed in a tablet or mobile
 */
export const MAX_SMALL_SCREEN_WIDTH = 1262;

export const isScreenWithinWidth = (maxWidth: number): boolean => {
  // Get viewport width
  // Source - https://stackoverflow.com/a/8876069/2621400
  const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );

  return w <= maxWidth;
};

export const isSmallScreen = (): boolean =>
  isScreenWithinWidth(MAX_SMALL_SCREEN_WIDTH);
