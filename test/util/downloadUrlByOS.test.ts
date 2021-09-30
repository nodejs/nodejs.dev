import downloadUrlByOS from '../../src/util/downloadUrlByOS';
import { UserOS } from '../../src/util/detectOS';

describe('downloadUrlByOS', () => {
  afterEach(() => {
    Object.defineProperty(window.navigator, 'appVersion', {
      writable: true,
      value: '',
    });
  });

  it('should be defined', () => {
    expect(downloadUrlByOS).toBeDefined();
  });

  describe('Windows build', () => {
    it('should return correct url for Windows WOW64', () => {
      Object.defineProperty(window.navigator, 'appVersion', {
        writable: true,
        value: 'WOW64',
      });
      expect(downloadUrlByOS(UserOS.WIN, 'version-mock')).toBe(
        'https://nodejs.org/dist/version-mock/node-version-mock-x64.msi'
      );
    });

    it('should return correct url for Windows Win64', () => {
      Object.defineProperty(window.navigator, 'appVersion', {
        writable: true,
        value: 'Win64',
      });
      expect(downloadUrlByOS(UserOS.WIN, 'version-mock')).toBe(
        'https://nodejs.org/dist/version-mock/node-version-mock-x64.msi'
      );
    });

    it('should return correct url for Windows general', () => {
      expect(downloadUrlByOS(UserOS.WIN, 'version-mock')).toBe(
        'https://nodejs.org/dist/version-mock/node-version-mock-x86.msi'
      );
    });
  });

  it('should return correct url for Mobile', () => {
    expect(downloadUrlByOS(UserOS.MOBILE, 'version-mock')).toBe(
      'https://nodejs.org/dist/version-mock'
    );
  });

  it('should return correct url for Mac', () => {
    expect(downloadUrlByOS(UserOS.MAC, 'version-mock')).toBe(
      'https://nodejs.org/dist/version-mock/node-version-mock.pkg'
    );
  });

  it('should return correct url for Mac', () => {
    expect(downloadUrlByOS(UserOS.MAC, 'version-mock')).toBe(
      'https://nodejs.org/dist/version-mock/node-version-mock.pkg'
    );
  });

  it('should return correct url others', () => {
    expect(downloadUrlByOS(UserOS.UNKNOWN, 'version-mock')).toBe(
      'https://nodejs.org/dist/version-mock/node-version-mock.tar.gz'
    );
  });
});
