import { getTerminatingString } from '../../src/util/getTerminatingString';

describe('getTerminatingString', () => {
  it('should be defined', () => {
    expect(getTerminatingString).toBeDefined();
  });

  it('should return correct ending for items in middle of sentence', () => {
    expect(getTerminatingString(1, 4)).toBe(', ');
  });

  it('should return correct ending for penultimate items', () => {
    expect(getTerminatingString(1, 3)).toBe(' and ');
  });

  it('should return correct ending for other cases', () => {
    expect(getTerminatingString(2, 2)).toBe('');
  });
});
