module.exports = {
  stories: ['../stories/**/*.stories.js', '../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  framework: {
    name: '@storybook/react-webpack5',
    options: { fastRefresh: true },
  },
  core: { builder: 'webpack5' },
  // Some of this configuration was taken from https://www.gatsbyjs.com/docs/how-to/testing/visual-testing-with-storybook/
  webpackFinal: async config => {
    // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    config.module.rules[2].use[0].options.plugins.push(
      require.resolve('babel-plugin-remove-graphql-queries')
    );

    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[2].exclude = [/node_modules\/(?!(gatsby)\/)/];

    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[2].use[0].loader = require.resolve('babel-loader');

    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[2].use[0].options.presets = [
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-env'),
    ];

    config.module.rules[2].use[0].options.plugins = [
      // use @babel/plugin-proposal-class-properties for class arrow functions
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('@babel/plugin-proposal-private-methods'),
      require.resolve('@babel/plugin-proposal-private-property-in-object'),
      // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      [
        require.resolve('babel-plugin-remove-graphql-queries'),
        {
          stage: config.mode === `development` ? 'develop-html' : 'build-html',
          staticQueryDir: 'page-data/sq/d',
        },
      ],
    ];

    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ['browser', 'module', 'main'];

    config.module.rules.push(
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [['react-app', { flow: false, typescript: true }]],

          plugins: [
            require.resolve('@babel/plugin-proposal-class-properties'),
            require.resolve('@babel/plugin-proposal-private-methods'),
            require.resolve(
              '@babel/plugin-proposal-private-property-in-object'
            ),
            // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
            [
              require.resolve('babel-plugin-remove-graphql-queries'),
              {
                stage:
                  config.mode === `development` ? 'develop-html' : 'build-html',
                staticQueryDir: 'page-data/sq/d',
              },
            ],
          ],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    );

    config.resolve.extensions.push('.ts', '.tsx');

    // Use SVGR for SVG files
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test.test('.svg')
    );

    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    config.performance.hints = false;

    return config;
  },
};
