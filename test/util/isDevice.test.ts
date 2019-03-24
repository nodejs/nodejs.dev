import { isSmallScreen, isMobile } from '../../src/util/isDevice';

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

describe('Tests for isMobile', () => {
  it('returns true for mobile devices', () => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => { return { matches: true } })
    });
    expect(isMobile()).toEqual(true)
  });
})
