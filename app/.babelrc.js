module.exports = {
  presets: ['next/babel'],

  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        root: ['./src'],
      },
    ],
  ],
};
