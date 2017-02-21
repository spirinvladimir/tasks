module.exports = {
  context: __dirname + '/client',
  entry: './index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  }
};
