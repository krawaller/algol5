module.exports = {
  presets: [
    // Compile to environments listed in .browserslistrc
    "@babel/env",
    "@babel/typescript",
  ],
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    // class { handleThing = () => { } }
    "@babel/proposal-class-properties",
    // { ...spread }
    "@babel/proposal-object-rest-spread",

    [
      "@babel/plugin-transform-runtime",
      {
        helpers: false,
        regenerator: true,
      },
    ],
  ],
};
