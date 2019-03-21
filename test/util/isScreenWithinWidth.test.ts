import {
  isScreenWithinWidth,
  MAX_SMALL_SCREEN_WIDTH,
  MAX_MOBILE_SCREEN_WIDTH,
} from '../../src/util/isScreenWithinWidth';

describe('Tests for isScreenWithinWidth', () => {
  it('returns true for small screens', () => {
    // @ts-ignore
    window.innerWidth = 1262;
    expect(isScreenWithinWidth(MAX_SMALL_SCREEN_WIDTH)).toEqual(true);
  });
  it('returns false for large screens', () => {
    // @ts-ignore
    window.innerWidth = 1263;
    expect(isScreenWithinWidth(MAX_SMALL_SCREEN_WIDTH)).toEqual(false);
  });

  it('returns true for mobile screens', () => {
    // @ts-ignore
    window.innerWidth = 720;
    expect(isScreenWithinWidth(MAX_MOBILE_SCREEN_WIDTH)).toEqual(true);
  });
  it('returns false for mobile screens', () => {
    // @ts-ignore
    window.innerWidth = 721;
    expect(isScreenWithinWidth(MAX_MOBILE_SCREEN_WIDTH)).toEqual(false);
  });
});
