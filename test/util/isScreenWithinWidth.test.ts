import {
  isScreenSmall,
  isScreenMobile,
} from '../../src/util/isScreenWithinWidth';

describe('Tests for isScreenSmall', () => {
  it('returns true for small screens', () => {
    // @ts-ignore
    window.innerWidth = 1262;
    expect(isScreenSmall()).toEqual(true);
  });
  it('returns false for large screens', () => {
    // @ts-ignore
    window.innerWidth = 1263;
    expect(isScreenSmall()).toEqual(false);
  });
});

describe('Tests for isScreenMobile', () => {
  it('returns true for mobile screens', () => {
    // @ts-ignore
    window.innerWidth = 720;
    expect(isScreenMobile()).toEqual(true);
  });
  it('returns false for mobile screens', () => {
    // @ts-ignore
    window.innerWidth = 721;
    expect(isScreenMobile()).toEqual(false);
  });
});
