const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.js'),
  devServer: {
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.?js|.?jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }, // config loader for both JS and JSX
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }, //config for CSS files
      {
        test: /\.(png|jp(e*)g|svg|gif|ico)$/,
        use: ['file-loader']
      }, //config for images
      {
        test: /\.svg$/,
        use: ['@svg/webpack']
      } //config for SVG as react component
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    })
  ]
};
