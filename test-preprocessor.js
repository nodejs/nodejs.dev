const babelJest = require('babel-jest').default;

const babelOptions = {
  presets: ['babel-preset-gatsby', '@babel/typescript'],
};

module.exports = babelJest.createTransformer(babelOptions);
