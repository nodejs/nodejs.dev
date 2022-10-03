import { parseApiDocsVersion } from '../parseApiDocsVersion';

describe('parseApiDocsVersion', (): void => {
  it('should be defined', (): void => {
    expect(parseApiDocsVersion).toBeDefined();
  });

  it(`should return the version when passing string`, (): void => {
    const stringVersion = '1.0';
    expect(parseApiDocsVersion(stringVersion)).toEqual(stringVersion);
  });

  it(`should return joined version with comma when passing array`, (): void => {
    const arrayVersion = ['1.0', '1.1', '2.4'];
    const expectedJoinedArray = '1.0, 1.1, 2.4';

    expect(parseApiDocsVersion(arrayVersion)).toEqual(expectedJoinedArray);
  });
});
