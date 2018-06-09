'use strict';

const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const publicPath = '/';

const publicUrl = '';
const env = getClientEnvironment(publicUrl);
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const bootEntry = [require.resolve('react-dev-utils/webpackHotDevClient'), require.resolve('./polyfills'), paths.appIndexJs ];

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        boot: bootEntry,
        styleguide: paths.appStyleguideJs
    },
    output: {
        path: paths.appBuild,
        pathinfo: true,
        filename: 'lib/js/[name].bundle.js',
        publicPath: publicPath
    },
    resolve: {
        modules: [
            paths.path.resolve(__dirname, "src"),
            paths.path.resolve(__dirname, "public"),
            paths.path.resolve(__dirname, "styleguide"),
            paths.node,
        ],
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            'react-native': 'react-native-web'
        }
    },


    module: {
        rules: [
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)(\?.*)?$/,
                    /\.css$/,
                    /\.sass$/,
                    /\.scss$/,
                    /\.json$/,
                    /\.svg$/
                ],
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'lib/media/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(js|jsx|mjs)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            formatter: eslintFormatter,
                            eslintPath: require.resolve('eslint'),

                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ],
                include: [paths.appSrc, paths.appStyleguide]
            },
            {
                test: /\.(js|jsx)$/,
                include: [paths.appSrc, paths.appStyleguide],
                loader: 'babel-loader'
            },
            {
                test: /\.svg$/,
                loader: 'file-loader',
                query: {
                    name: 'lib/media/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.css|scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            config: {
                                path: paths.path.resolve(__dirname, 'postcss.config.js'),
                            },
                        },
                    },
                    {loader: 'sass-loader'}
                ]
            },
        ]
    },
    plugins: [
        new InterpolateHtmlPlugin(env.raw),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
        }),
        new webpack.DefinePlugin(env.stringified),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin(),
        new WatchMissingNodeModulesPlugin(paths.appNodeModules)
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};