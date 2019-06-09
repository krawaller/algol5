module.exports = {
  presets: [
    // Compile to environments listed in .browserslistrc
    "@babel/env",
    "@babel/typescript",
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: 2,
      },
    ],
  ],
  plugins: [
    // class { handleThing = () => { } }
    "@babel/proposal-class-properties",
    // { ...spread }
    "@babel/proposal-object-rest-spread",
  ],
};
