import { dateIsBetween } from '../dateIsBetween';

describe('dateIsBetween', () => {
  it('should return true if date is between two dates', () => {
    expect(dateIsBetween('2000-08-21', '2022-09-19')).toBe(true);
  });

  it('should return false if date is not between two dates', () => {
    expect(dateIsBetween('2000-08-21', '2022-09-18')).toBe(false);
  });
});
