import { isSmallScreen } from '../../src/util/isSmallScreen';

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
