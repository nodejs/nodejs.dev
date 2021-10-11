import getReleaseStatus from '../../util-node/getReleaseStatus';

describe('getReleaseStatus', () => {
  it('should detect maintenance release', () => {
    expect(
      getReleaseStatus({
        // date in the past
        maintenance: '2020-01-01',
      })
    ).toBe('Maintenance LTS');
  });

  it('should detect active LTS release', () => {
    const minusOneDayTimestamp = new Date().getTime() - 24 * 60 * 60 * 1000;
    expect(
      getReleaseStatus({
        lts: new Date(minusOneDayTimestamp).toISOString(),
      })
    ).toBe('Active LTS');
  });

  it('should detect current release', () => {
    expect(
      getReleaseStatus({
        start: '2020-01-01',
      })
    ).toBe('Current');
  });

  it('should detect pending release', () => {
    expect(getReleaseStatus({})).toBe('Pending');
  });
});
