import getPaginationPath from '../getPaginationPath';

describe('getPaginationPath', () => {
  it('returns correct path', () => {
    const path = getPaginationPath('/blog/', 'nodName')(2);

    expect(path).toBe('/blog/nodName/page/2/');
  });

  it('returns only only page path', () => {
    const path = getPaginationPath('/blog/')(2);

    expect(path).toBe('/blog/page/2/');
  });

  it('returns path without pagination', () => {
    const path = getPaginationPath('/blog/', 'nodName')(1);

    expect(path).toBe('/blog/nodName/');
  });
});
