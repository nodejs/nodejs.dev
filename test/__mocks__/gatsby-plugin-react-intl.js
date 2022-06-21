const React = require('react');

const reactIntl = jest.requireActual('gatsby-plugin-react-intl');

module.exports = {
  ...reactIntl,
  Link: jest
    .fn()
    .mockImplementation(
      ({ to, activeClassName, innerRef, partiallyActive, ...rest }) =>
        React.createElement('a', {
          ...rest,
          href: to,
        })
    ),
  useIntl: () => ({
    locale: 'en',
  }),
};
