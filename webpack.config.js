const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    __dirname + "/src/index.js",
    __dirname + "/src/styles.css",
 ],

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/img',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'asset/fonts/[name][ext]'
        }
      },
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({}),
    ]
  },
  plugins: [
      new MiniCssExtractPlugin({filename: 'styles.css'}),
    ]
}
