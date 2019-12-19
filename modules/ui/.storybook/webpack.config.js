const path = require("path");

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [["react-app", { flow: false, typescript: true }]],
        },
      },
    ],
  });
  config.module.rules = config.module.rules.filter(
    r => !r.test.toString().match("css")
  );
  config.module.rules.push({
    test: /\.css$/,
    use: [
      require.resolve("style-loader"),
      {
        loader: require.resolve("css-loader"),
        options: {
          modules: true,
        },
      },
    ],
  });
  config.resolve.extensions.push(".ts", ".tsx", ".css");
  return config;
};
