import { TextDecoder, TextEncoder } from 'util';

// eslint-disable-next-line no-underscore-dangle
global.___loader = {
  enqueue: jest.fn(),
};

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// ICU configuration for React-Intl
Intl.NumberFormat.format = new Intl.NumberFormat('en').format;
Intl.DateTimeFormat.format = new Intl.DateTimeFormat('en').format;

const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});

window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);
