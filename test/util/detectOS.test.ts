import { detectOS } from '../../src/util/detectOS';

describe('Detect the user OS function', () => {
  it('should be defined', () => {
    expect(detectOS).toBeDefined();
  });
  it('should detect Windows', () => {
    Object.defineProperty(window.navigator, 'appVersion', {
      writable: true,
      value: 'Windows',
    });
    expect(detectOS()).toBe('WIN');
  });
  it('should detect Mac', () => {
    Object.defineProperty(window.navigator, 'appVersion', {
      writable: true,
      value: 'Mac',
    });
    expect(detectOS()).toBe('MAC');
  });
  it('should detect Unix', () => {
    Object.defineProperty(window.navigator, 'appVersion', {
      writable: true,
      value: 'X11',
    });
    expect(detectOS()).toBe('UNIX');
  });
  it('should detect Linux', () => {
    Object.defineProperty(window.navigator, 'appVersion', {
      writable: true,
      value: 'Linux',
    });
    expect(detectOS()).toBe('LINUX');
  });
  it('should detect Mobile', () => {
    Object.defineProperty(window.navigator, 'appVersion', {
      writable: true,
      value: 'Mobi',
    });
    expect(detectOS()).toBe('MOBILE');
  });
  it('should detect others as unknown', () => {
    Object.defineProperty(window.navigator, 'appVersion', {
      writable: true,
      value: 'mock',
    });
    expect(detectOS()).toBe('UNKNOWN');
  });
});
