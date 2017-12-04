const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './client/index.html',
	filename: 'index.html',
	inject: 'body'
});

const ExtractTextPluginConfig = new ExtractTextPlugin({
    filename: 'index_bundle.css',
    allChunks: true
  });

module.exports = {
	entry: './client/index.js',
	output: {
		path: path.resolve('dist'),
		filename: 'index_bundle.js'
	},
	module: {
		rules: [
			{ test: /\.js|.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.scss$/, use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']})
			},
			{ test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				use: 'file-loader'
			},
		]
	},
	plugins: [
		HtmlWebpackPluginConfig,
		ExtractTextPluginConfig
	]
};