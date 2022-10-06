import { copyTextToClipboard } from '../copyTextToClipboard';

describe('copyTextToClipboard', () => {
  it('should be defined', () => {
    expect(copyTextToClipboard).toBeDefined();
  });

  it('should call navigator.clipboard.writeText with `test`', async () => {
    const navigatorClipboardWriteTextSpy = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    Object.defineProperty(window.navigator, 'clipboard', {
      writable: true,
      value: {
        writeText: navigatorClipboardWriteTextSpy,
      },
    });

    expect(await copyTextToClipboard('test')).toBe(true);

    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledTimes(1);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledWith('test');
  });
});
