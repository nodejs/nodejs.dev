import { getAgeInYears } from '../getAgeInYears';

describe('getAgeInYears', () => {
  it('should return correct age for a given date', () => {
    expect(getAgeInYears('2000-08-21')).toBe(22);
  });
});
