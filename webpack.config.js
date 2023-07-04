const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { config } = require("./src/shared/config");

const deps = require("./package.json").dependencies;

const externals = {
   react: 'React', // Specify the global variable for React from the host application
   'react-dom': 'ReactDOM' // Specify the global variable for ReactDOM from the host application
};

  console.log(externals, process.env.ENVIRONMENT)

module.exports = (_, argv) => ({
  output: {
    publicPath: config.WEBPACK_PUBLIC_PATH
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8081,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  externals,

  plugins: [
    new ModuleFederationPlugin({
      name: "climas_legacy_components",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./test": "./src/shared/components/test",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/webpack/webpack-template.html",
    }),
  ],
});
