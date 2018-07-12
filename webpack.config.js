module.exports = {
  entry: [
    '/client/src/index.js'
  ],
  output: {
    path: __dirname + '/client/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './client/dist'
  }
};