import { replaceDataTagFromString } from '../replaceDataTag';

describe('replaceDataTagFromString', (): void => {
  it('should be defined', (): void => {
    expect(replaceDataTagFromString).toBeDefined();
  });

  it('should remove href regex datatags', (): void => {
    expect(replaceDataTagFromString('datatag-tagc--')).toEqual('');
    expect(replaceDataTagFromString('datatag-tagm--')).toEqual('');
    expect(replaceDataTagFromString('datatag-tage--')).toEqual('');
    expect(replaceDataTagFromString('tag-tagc--')).toEqual('');
    expect(replaceDataTagFromString('tag-tagm--')).toEqual('');
    expect(replaceDataTagFromString('tag-tage--')).toEqual('');
  });

  it('should replace text regex datatags with prefix', (): void => {
    expect(replaceDataTagFromString('<DataTag tag="M" /> Testing')).toEqual(
      'Testing'
    );
    expect(replaceDataTagFromString('<DataTag tag="C" /> Testing')).toEqual(
      'Class: Testing'
    );
    expect(replaceDataTagFromString('<DataTag tag="E" /> Testing')).toEqual(
      'Event: Testing'
    );
    expect(replaceDataTagFromString('<Tag tag="M" /> Testing')).toEqual(
      'Testing'
    );
    expect(replaceDataTagFromString('<Tag tag="C" /> Testing')).toEqual(
      'Class: Testing'
    );
    expect(replaceDataTagFromString('<Tag tag="E" /> Testing')).toEqual(
      'Event: Testing'
    );
  });
});
