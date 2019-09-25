let path = require('path')
// const ThreeExamples = require('import-three-examples')
function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	// 基本路径
	publicPath: './',
	// 输出文件目录
	outputDir: 'dist',
	// eslint-loader 是否在保存的时候检查
	lintOnSave: false,

	// use the full build with in-browser compiler?
	// https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
	// compiler: false,
	// webpack配置
	// see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
	chainWebpack: config => {
		 config.module
		      .rule('images')
		        .use('url-loader')
		          .loader('url-loader')
		          .tap(options => Object.assign(options, { limit: 10240 }))
		  config.resolve.alias
		      .set('@src', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
		      .set('@static', resolve('static'))
		//       .set('webVideoCtrl',resolve('src/assets/js/webVideoCtrl.js'))
		//     config.entry('index')
		//       .add('babel-polyfill')
		
		// '@': path.resolve(__dirname, './src'),
		// '@static': path.resolve(__dirname, './src/static'),
		// config.module
		//        .rule('obj')
		//        .test(/\.(fbx|obj)$/)
		//        .use('file-loader')
		//        .loader('file-loader')
// 		config.resolve.alias
// 			.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
// 			.set('@static', path.resolve(__dirname, '../static')) // key,value自行定义，比如.set('@@', resolve('src/components'))
		// ThreeExamples.forEach((v) => {
		//         if (~v.use.indexOf('imports')) {
		//             config.module
		//                 .rule(`${v.test}_i`)
		//                 .test(require.resolve(v.test))
		//                 .use(v.use)
		//                 .loader(v.use)
		//         } else {
		//             config.module
		//                 .rule(`${v.test}_e`)
		//                 .test(require.resolve(v.test))
		//                 .use(v.use)
		//                 .loader(v.use)
		//         }
		//     })
	},
	configureWebpack: (config) => {

		// Object.assign(config, {
		// 	// 开发生产共同配置
		// 	resolve: {
		// 		alias: {
		// 			'@': path.resolve(__dirname, './src'),
		// 			'@static': path.resolve(__dirname, './src/static'),
		// 			// loaders:[
		// 			// 	{test: /\.json$/,loader: 'json-loader'},
		// 			// 	{
		// 			// 		test:/\.css$/,
		// 			// 		loader:'style-loader!css-loader!autoprefixer-loader'
		// 			// 	},
		// 			// 	{
		// 			// 		test:/\.less$/,
		// 			// 		loader:'style-loader!css-loader!autoprefixer-loader!less-loader'
		// 			// 	}
		// 			// ]
		// 		} // 别名配置
		// 	}
		// })
	},
	// configureWebpack: () => {
	// 	loaders:[
	// 		{test: /\.json$/,loader: 'json-loader'},
	// 		{
	// 			test:/\.css$/,
	// 			loader:'style-loader!css-loader!autoprefixer-loader'
	// 		},
	// 		{
	// 			test:/\.less$/,
	// 			loader:'style-loader!css-loader!autoprefixer-loader!less-loader'
	// 		},
	// 		{
	// 			test:/\.(jpg|png|svg|ttf|woff|woff2|gif)$/,
	// 			loader:'url-loader',
	// 			options:{
	// 				limit:8192,//4096以上生成文件,否则base64
	// 				name:'[name].[ext]'
	// 			}
	// 		},
	// 		{
	// 			test:/\.js$/,
	// 			loader:'babel-loader',
	// 			exclude:/node_modules/,
	// 			options:{
	// 				presets:['es2015'],
	// 				plugins:['transform-runtime']
	// 			}
	// 		},
	// 		{
	// 			test:/\.vue$/,
	// 			loader:'vue-loader'
	// 		},
	// 		{
	// 			test: require.resolve("three/examples/js/controls/OrbitControls"),
	// 			use: "imports-loader?THREE=three"
	// 		},
	// 		{
	// 			test: require.resolve("three/examples/js/controls/OrbitControls"),
	// 			use: "exports-loader?THREE.OrbitControls"
	// 		},
	// 		{
	// 			test: require.resolve("three/examples/js/WebGL"),
	// 			use: "imports-loader?THREE=three"
	// 		},
	// 		{
	// 			test: require.resolve("three/examples/js/WebGL"),
	// 			use: "exports-loader?THREE.WebGL"
	// 		},
	// 		{
	// 			test: require.resolve("three/examples/js/lights/RectAreaLightUniformsLib"),
	// 			use: "imports-loader?THREE=three"
	// 		},
	// 		{
	// 			test: require.resolve("three/examples/js/lights/RectAreaLightUniformsLib"),
	// 			use: "exports-loader?THREE.RectAreaLightUniformsLib"
	// 		},
	// 		{
	// 			test: require.resolve("three/examples/js/controls/FlyControls"),
	// 			use: "imports-loader?THREE=three"
	// 		},
	// 		{
	// 			test: require.resolve("three/examples/js/controls/FlyControls"),
	// 			use: "exports-loader?THREE.FlyControls"
	// 		},
	// 		{
	// 			test: require.resolve("three/examples/js/objects/Lensflare"),
	// 			use: "imports-loader?THREE=three"
	// 		},
	// 		{
	// 			test: require.resolve("three/examples/js/objects/Lensflare"),
	// 			use: "exports-loader?THREE.Lensflare"
	// 		},
	// 		{
	// 			test: require.resolve("three/examples/js/utils/SceneUtils"),
	// 			use: "imports-loader?THREE=three"
	// 		},
	// 		{
	// 			test: require.resolve("three/examples/js/utils/SceneUtils"),
	// 			use: "exports-loader?THREE.SceneUtils"
	// 		}
	// 	]
	// },
	// vue-loader 配置项
	// https://vue-loader.vuejs.org/en/options.html
	// vueLoader: {},
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: false,
	// css相关配置
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true,
		// 开启 CSS source maps?
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {
			postcss: {
				plugins: [
					require('postcss-pxtorem')({
						rootValue: 100, // 换算的基数
						selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
						propList: ['*'],
					}),
				]
			}
		},
		// 启用 CSS modules for all css / pre-processor files.
		modules: false
	},
	// use thread-loader for babel & TS in production build
	// enabled by default if the machine has more than 1 cores
	parallel: require('os').cpus().length > 1,
	// 是否启用dll
	// See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
	// dll: true,
	// PWA 插件相关配置
	// see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
	pwa: {},
	// webpack-dev-server 相关配置
	devServer: {
		open: process.platform === 'darwin',
		host: '0.0.0.0',
		port: 8080,
		https: false,
		hotOnly: false,
		proxy: null, // 设置代理
		before: app => {}
	},
	// 第三方插件配置
	pluginOptions: {
		// ...
	}
}
