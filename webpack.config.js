module.exports = {
	entry: "./src/main.js",
	output: {
		path: "dist",
		filename: "scripts.js",
	},
	devServer: {
		historyApiFallback: true,
		contentBase: "./dist/",
		inline: true,
		port : 3000
	}
};