const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const globPath = './demo/*.html';

const htmlPluginList = [
    new VueLoaderPlugin(), // 最新版的vue-loader需要配置插件
    new webpack.HotModuleReplacementPlugin({}), // 启用webpack的热模块替换功能
];
// 同步的匹配文件列表，获取文件路径
glob.sync(globPath).forEach((entry) => {
  const filename = path.posix.basename(entry);
  console.log(filename)
  htmlPluginList.push(        
      new htmlPlugin({
            filename,
            template:entry,
            chunks: [`${filename.replace('.html','')}`]   // 使用chunks 需要指定entry 入口文件中的哪一个模块
      })
    )
});

module.exports = {
    entry: {
        'head': './src/h5/head.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    }, 
    resolve: {
        alias: {
          '@src': path.resolve(__dirname, './src/'),
          '@lib': path.resolve(__dirname, './lib/'),
        },
    },
    module: {
        rules: [
            {
                // 使用vue-loader解析.vue文件
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|mp4)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { // babel 转义的配置选项
                        babelrc: false,
                        presets: [
                            require.resolve('@babel/preset-react'),
                            [
                                require.resolve('@babel/preset-env'),
                                { modules: false }
                            ],
                        ],
                       cacheDirectory: true,
                       plugins: [
                              ['import', { libraryName: 'antd', style: true }],
                       ],
                    },
                },
            },
            {
            test: /\.pdf$/,
            use: {
              loader: 'file-loader',
              options: {
                name: 'doc/[name].[ext]'
              }
            }
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            importLoaders: 1
                        },
                    },
                    {loader: 'postcss-loader'}
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: 'file-loader'
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    }, 
                    {
                        loader: "css-loader"
                    }, 
                    {
                        loader: "less-loader", 
                        options: {
                            javascriptEnabled: true,
                        }
                    }]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    }, 
                    {
                        loader: "css-loader"
                    }, 
                    {
                        loader: "sass-loader", 
                    }]
            },
        ]
    },
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            include: /\.js(\?.*)?$/i,
            uglifyOptions: {
                warnings: false,
                parse: {},
                compress: {},
                mangle: true,  // 字段就是可以配置混淆的。
                output: null,
                toplevel: false,
                nameCache: null,
                ie8: false,
                keep_fnames: false,
              },
          }),
        ],
    },
    plugins: htmlPluginList,
    devServer: {
         // webpack-dev-server
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        host: '0.0.0.0',
        allowedHosts: [
            'host.com',
            'host2.com'
        ],
        open: 'Chrome',
        openPage: 'head.html',
        // proxy: {
        //     '/': {
        //         // target: 'http://192.168.5.132:8081', 
        //         target: 'http://uapi.gsl.gaosiedu.com/ ',
        //         changeOrigin: true, // 是否跨域
        //     },
        // },
    },
    mode: 'development',
};
