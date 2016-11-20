module.exports = {
	entry: "./src/main.js",
	output: {
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
	}
};