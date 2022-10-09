import { dateIsBetween } from '../dateIsBetween';

describe('dateIsBetween', (): void => {
  const difference = 1000 * 60 * 60 * 24 * 10;

  const present = new Date().getTime();

  const startDate = new Date(present - difference).toString();

  const endDate = new Date(present + difference).toString();

  it('should be defined', (): void => {
    expect(dateIsBetween).toBeDefined();
  });

  it(`should return false for 'nodejs.dev', 'nodejs.org' since both arguments are not date string`, (): void => {
    expect(dateIsBetween('nodejs.dev', 'nodejs.org')).toBeFalsy();
  });

  it(`should return false for 'hello node', '${endDate}' since first argument is not date string`, (): void => {
    expect(dateIsBetween('hello node', endDate)).toBeFalsy();
  });

  it(`should return false for '${startDate}', 'hello node' since second argument is not date string`, (): void => {
    expect(dateIsBetween(startDate, 'hello node')).toBeFalsy();
  });

  it(`should return false for '${endDate}', '${startDate}' since start date is greater than end date`, (): void => {
    expect(dateIsBetween(endDate, startDate)).toBeFalsy();
  });

  it(`should return true for '${startDate}', '${endDate}' since start date is smaller than end date`, (): void => {
    expect(dateIsBetween(startDate, endDate)).toBeTruthy();
  });
});
