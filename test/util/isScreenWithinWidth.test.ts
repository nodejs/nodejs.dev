import {
  isSmallScreen,
  isMobileScreen,
} from '../../src/util/isScreenWithinWidth';

describe('Tests for isSmallScreen', () => {
  it('returns true for small screens', () => {
    // @ts-ignore
    window.innerWidth = 1262;
    expect(isSmallScreen()).toEqual(true);
  });
  it('returns false for large screens', () => {
    // @ts-ignore
    window.innerWidth = 1263;
    expect(isSmallScreen()).toEqual(false);
  });
});

describe('Tests for isMobileScreen', () => {
  it('returns true for mobile screens', () => {
    // @ts-ignore
    window.innerWidth = 720;
    expect(isMobileScreen()).toEqual(true);
  });
  it('returns false for mobile screens', () => {
    // @ts-ignore
    window.innerWidth = 721;
    expect(isMobileScreen()).toEqual(false);
  });
});
