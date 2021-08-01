import {
  isSmallScreen,
  isMobileScreen,
} from '../../src/util/isScreenWithinWidth';

describe('Tests for isSmallScreen', () => {
  it('returns true for small screens', () => {
    window.innerWidth = 1262;
    expect(isSmallScreen()).toEqual(true);
  });
  it('returns false for large screens', () => {
    window.innerWidth = 1263;
    expect(isSmallScreen()).toEqual(false);
  });
});

describe('Tests for isMobileScreen', () => {
  it('returns true for screens on mobile devices', () => {
    window.innerWidth = 720;
    expect(isMobileScreen()).toEqual(true);
  });
  it('returns false for screens larger than on mobile devices', () => {
    window.innerWidth = 721;
    expect(isMobileScreen()).toEqual(false);
  });
});
