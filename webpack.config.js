import path from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { config as dotenvConfig } from 'dotenv'
import webpack from 'webpack'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenvConfig({ path: path.resolve(__dirname, '.env') })

export default {
	mode: 'development',
	entry: './src/webpack-main.tsx',
	output: {
		path: path.resolve(__dirname, 'dist-webpack'),
		filename: 'bundle.js',
		clean: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
						configFile: 'tsconfig.webpack.json',
					},
				},
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
		new webpack.DefinePlugin({
			'process.env.LLM_MODEL_NAME': JSON.stringify(process.env.LLM_MODEL_NAME),
			'process.env.LLM_API_KEY': JSON.stringify(process.env.LLM_API_KEY),
			'process.env.LLM_BASE_URL': JSON.stringify(process.env.LLM_BASE_URL),
		}),
	],
	devServer: {
		port: 3001,
		hot: true,
	},
}
