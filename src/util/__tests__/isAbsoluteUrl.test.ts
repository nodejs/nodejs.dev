import { isAbsoluteUrl } from '../isAbsoluteUrl';

describe('`isAbsoluteUrl`', (): void => {
  it(`should return false for the link 'nodejs.dev' since it doesn't have protocols`, (): void => {
    expect(isAbsoluteUrl('nodejs.dev')).toBeFalsy();
  });

  it(`should return false for the link 'www.nodejs.dev' since it doesn't have protocols`, (): void => {
    expect(isAbsoluteUrl('www.nodejs.dev')).toBeFalsy();
  });

  it(`should return false for the URI 'mailto://admin@nodejs.dev' since it is not a URL`, (): void => {
    expect(isAbsoluteUrl('mailto://admin@nodejs.dev')).toBeFalsy();
  });

  it(`should return false for the URI 'wss://nodejs.dev' since it is not a URL`, (): void => {
    expect(isAbsoluteUrl('wss://nodejs.dev')).toBeFalsy();
  });

  it(`should return true for the URI 'http://nodejs.dev'`, (): void => {
    expect(isAbsoluteUrl('http://nodejs.dev')).toBeTruthy();
  });

  it(`should return true for the URI 'https://nodejs.dev'`, (): void => {
    expect(isAbsoluteUrl('https://nodejs.dev')).toBeTruthy();
  });
});
