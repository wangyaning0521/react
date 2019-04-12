const path                      = require('path')
const HtmlWebpackPlugin         = require('html-webpack-plugin');
const MiniCssExtractPlugin      = require("mini-css-extract-plugin");
const glob                      = require('glob');
const  PurifyCSSPlugin          = require("purifycss-webpack");
const UglifyJsPlugin            = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin   = require('optimize-css-assets-webpack-plugin');
const webpack                   = require('webpack')

const isPro = process.env.NODE_ENV == 'production'



const htmlWebpackPlugin = new HtmlWebpackPlugin({
    filename:'index.html',
    template:path.resolve(__dirname,'src/index.html')
})

const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: isPro ? 'css/[name].[hash].css' : 'css/[name].css' ,
    chunkFilename: isPro ? '[id].[hash].css' : '[id].css' ,
})


module.exports = {
    entry: [
        // 开启react代码的模块热替换（HMR）
        'react-hot-loader/patch',
        // 为webpack-dev-server的环境打包好运行代码
        // 然后连接到指定服务器域名与端口, 这里的端口为自己项目的端口
        'webpack-dev-server/client?http://localhost:1208/',
        // 为热替换（HMR）打包好运行代码
        // only- 意味着只有成功更新运行代码才会执行热替换（HMR）
        'webpack/hot/only-dev-server',
        //主文件
        './src/app.jsx'
    ],
    output:{
        path:
            path.resolve(__dirname,'dist'),
        filename:
            'js/bundle.js',
        publicPath:
            ''
    },
    performance: {
        hints: false
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名  
                    priority: 10    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                },
                utils: { // 抽离自己写的公共代码，utils这个名字可以随意起 (css/js公用的都会单独抽离出来生成一个单独的文件)
                   chunks: 'initial',
                   name: 'common',  // 任意命名
                   minSize: 0    // 字节生成新包
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    ecma: 8,
                    cache: true,
                    parallel: true,
                    sourcMap: true,
                }
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    }, 
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                use: [{
                    loader: 'babel-loader',
                }]  
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            minimize: true
                        }
                    },
                    'css-loader',
                    "postcss-loader"
                ]
            }, {
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    "postcss-loader",
                ]
            },
            {
	            test:/\.(png|jpg|gif|svg)$/,
	            use:[
                    {
                        loader:'url-loader',
                        options:{
                            name: '[name].[ext]',
                            limit:50000, 
                            outputPath:'images' 
                        }
                    },
                    {	
                        loader:'image-webpack-loader',
                        options:{
                            bypassOnDebug: true
                        }
                    }
	            ]
            }
        ]
    },
    devServer:{
        port: 1208,
        open: true,
        hot:true
    },
    plugins:[
        htmlWebpackPlugin,
        miniCssExtractPlugin,
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ]
}


