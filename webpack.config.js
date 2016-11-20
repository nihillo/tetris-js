module.exports = {
	entry: "./src/main.js",
	output: {
		path: "dist",
		filename: "scripts.js",
	},
	module: {
	  loaders: [
	    {
	      test: /\.js$/,
	      exclude: /node_modules/,
	      loader: 'babel-loader',
	      query: {
	        presets: ['es2015']
	      }
	    }
	  ]
	},
	devServer: {
		historyApiFallback: true,
		contentBase: "./dist/",
		inline: true,
		port : 3000
	}
};