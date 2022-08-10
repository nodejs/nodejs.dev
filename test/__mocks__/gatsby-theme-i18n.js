const React = require('react');

module.exports = {
  MdxLink: jest
    .fn()
    .mockImplementation(
      ({ to, activeClassName, innerRef, partiallyActive, ...rest }) =>
        React.createElement('a', {
          ...rest,
          href: to,
        })
    ),
  LocalizedLink: jest
    .fn()
    .mockImplementation(
      ({ to, activeClassName, innerRef, partiallyActive, ...rest }) =>
        React.createElement('a', {
          ...rest,
          href: to,
        })
    ),
  useLocalization: () => ({
    locale: 'en',
    defaultLang: 'en',
    prefixDefault: true,
    config: {},
    localizedPath: ({ path }) => path,
  }),
};
