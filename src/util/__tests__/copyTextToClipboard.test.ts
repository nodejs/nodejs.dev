import { copyTextToClipboard } from '../copyTextToClipboard';

describe('copyTextToClipboard', () => {
  it('should be defined', () => {
    expect(copyTextToClipboard).toBeDefined();
  });

  it('should return `false` when copy failed', async () => {
    const navigatorClipboardWriteTextSpy = jest
      .fn()
      .mockImplementation(() => Promise.reject());

    Object.defineProperty(window.navigator, 'clipboard', {
      writable: true,
      value: {
        writeText: navigatorClipboardWriteTextSpy,
      },
    });

    expect(await copyTextToClipboard('test')).toBe(false);
  });

  it('should return `true` when successfully copied', async () => {
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
  });

  it('should call clipboard API with `test`', () => {
    const navigatorClipboardWriteTextSpy = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    Object.defineProperty(window.navigator, 'clipboard', {
      writable: true,
      value: {
        writeText: navigatorClipboardWriteTextSpy,
      },
    });

    copyTextToClipboard('test');

    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledTimes(1);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledWith('test');
  });
});
