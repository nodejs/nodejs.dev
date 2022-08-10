import { TextDecoder, TextEncoder } from 'util';

// eslint-disable-next-line no-underscore-dangle
global.___loader = {
  enqueue: jest.fn(),
};

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
