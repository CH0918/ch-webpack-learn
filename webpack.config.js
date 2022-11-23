const path = require('path');
module.exports = {
	entry: path.resolve(__dirname, './src/index.js'),
	output: {
		filename: '[name].js',
		path: path.join(__dirname, './dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader']
			}
		]
	}
}