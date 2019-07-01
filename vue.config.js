const path = require('path');

const webpack = require('webpack');

const cesiumSource = 'node_modules/cesium/Source';
const cesiumjs = '../Build/Cesium/Cesium.js';
const cesiumWorkers = '../Build/Cesium/Workers';
const cesiumThirdParty = '../Build/Cesium/ThirdParty';

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	configureWebpack: {
		// context: __dirname,
		// // 为 cesium 模块创建别名，更方便进行 import 和 require
		// resolve: {
		// 	alias: {
		// 		cesium: path.resolve(__dirname, cesiumSource)
		// 	}
		// },
		amd: {
			// Enable webpack-friendly use of require in Cesium
			// Tells Cesium that the version of AMD webpack uses to evaluate require statements is not compliant with the standard toUrl function
			toUrlUndefined: true
		},
		plugins: [
			new CopyWebpackPlugin([
				{ from: path.join(cesiumSource, cesiumjs), to: 'Cesium/Cesium.js' },
				{ from: path.join(cesiumSource, cesiumThirdParty), to: 'Cesium/ThirdParty' },
				{ from: path.join(cesiumSource, 'Assets'), to: 'Cesium/Assets' },
				{ from: path.join(cesiumSource, 'Widgets'), to: 'Cesium/Widgets' },
				{ from: path.join(cesiumSource, cesiumWorkers), to: 'Cesium/Workers' }
			]),
			new webpack.DefinePlugin({
				// Define relative base path in cesium for loading assets
				CESIUM_BASE_URL: JSON.stringify('Cesium')
			})
		]
	},
	devServer: {
		proxy: {
			'/56': { //地形理路径
				target: 'http://localhost:5000', //'http://localhost:5000',
				changeOrigin: true
			},
			'/pointcloud': { //地形理路径
				target: 'http://localhost:5000', //'http://localhost:5000',
				changeOrigin: true
			}
			
		}
	}

}