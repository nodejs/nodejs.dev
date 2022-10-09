import { detectLanguage } from '../detectLanguage';

describe('detectLanguage', (): void => {
  it('should be defined', (): void => {
    expect(detectLanguage).toBeDefined();
  });

  it('should detect English (en) when single language is present', (): void => {
    Object.defineProperty(window.navigator, 'language', {
      writable: true,
      value: 'en-US',
    });
    expect(detectLanguage()).toBe('en');
  });

  it('should detect English (en) when array of languages is present', (): void => {
    Object.defineProperty(window.navigator, 'languages', {
      writable: true,
      value: ['en', 'en-US'],
    });
    expect(detectLanguage()).toBe('en');
  });

  it('should detect French (fr) or Français', (): void => {
    Object.defineProperty(window.navigator, 'languages', {
      writable: true,
      value: ['fr'],
    });
    expect(detectLanguage()).toBe('fr');
  });

  it(`should return null for 'hi' since it is not present in nodejs`, (): void => {
    Object.defineProperty(window.navigator, 'languages', {
      writable: true,
      value: ['hi'],
    });
    expect(detectLanguage()).toBeNull();
  });

  it(`should return null for 'english' since it is not a valid locale`, (): void => {
    Object.defineProperty(window.navigator, 'languages', {
      writable: true,
      value: ['english'],
    });
    expect(detectLanguage()).toBeNull();
  });
});
