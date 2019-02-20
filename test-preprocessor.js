const babelOptions = {
  presets: ['babel-preset-gatsby', '@babel/typescript'],
};

module.exports = require('babel-jest').createTransformer(babelOptions);
