import { toCamelCaseStatus } from '../strings';

describe('toCamelCaseStatus', () => {
  it('should return camel case string of status', () => {
    expect(toCamelCaseStatus('End of Life')).toStrictEqual('endOfLife');
    expect(toCamelCaseStatus('Maintenance LTS')).toStrictEqual(
      'maintenanceLts'
    );
    expect(toCamelCaseStatus('Active LTS')).toStrictEqual('activeLts');
    expect(toCamelCaseStatus('Current')).toStrictEqual('current');
    expect(toCamelCaseStatus('Pending')).toStrictEqual('pending');
  });
});
