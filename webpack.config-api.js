const path = require("path");

module.exports = (env) => {
	return {
		entry: "./src/index-api.js",
		output: {
			filename: "bundle-api.js",
			path: path.resolve(__dirname, "dist")
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env", "@babel/preset-react"]
						}
					}
				},
				{
					test: /\.css$/,
					use: [ "style-loader", "css-loader" ]
				}
			]
		},
		resolve: {
			extensions: ['.js', '.jsx']
		},
		devtool: env && env.production ? false : "inline-source-map",
		devServer: {
			static: {
				directory: path.join(__dirname, '.'),
			},
			compress: true,
			port: 8080
		}
	};
};
