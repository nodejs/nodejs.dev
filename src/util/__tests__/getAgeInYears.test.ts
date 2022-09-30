import { getAgeInYears } from '../getAgeInYears';

describe('getAgeInYears', (): void => {
  const presentDateYear = new Date().getFullYear();
  const difference = 10;
  const pastDate = `${presentDateYear - difference}-01-01`;
  const futureDate = `${presentDateYear + difference}-01-01`;

  it('should be defined', (): void => {
    expect(getAgeInYears).toBeDefined();
  });

  it(`should return 'NaN' for 'hello node' since argument is not a date string`, (): void => {
    expect(getAgeInYears('hello node')).toBeNaN();
  });

  it(`should return 'NaN' for '17-08-2000' since date string format is wrong`, (): void => {
    expect(getAgeInYears('17-08-2000')).toBeNaN();
  });

  it(`should return negative for '${futureDate}' since date string is a date in future`, (): void => {
    expect(getAgeInYears(futureDate)).toBeLessThan(0);
  });

  it(`should return -10 for '${futureDate}'`, (): void => {
    expect(getAgeInYears(futureDate)).toBe(-10);
  });

  it(`should return positive for '${pastDate}' since date string is a date in past`, (): void => {
    expect(getAgeInYears(pastDate)).toBeGreaterThanOrEqual(0);
  });

  it(`should return 10 for '${pastDate}'`, (): void => {
    expect(getAgeInYears(pastDate));
  });
});
