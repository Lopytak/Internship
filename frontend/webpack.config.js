const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const EsLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = (env, argv) => {
    return {
        entry: './frontend/src/app.js',

        mode: argv.mode,

        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.[contenthash].css'
            }),
            new HtmlWebpackPlugin({
                template: './frontend/src/pages/index.pug'
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'src/images/'),
                        to: 'images',
                        noErrorOnMissing: true
                    },
                    {
                        from: path.resolve(__dirname, 'src/fonts/'),
                        to: 'fonts',
                        noErrorOnMissing: true
                    }
                ]
            }),
            new EsLintPlugin({
                files: ['./frontend/src/js/*.js', './frontend/src/js/*.jsx']
            }),
            new StyleLintPlugin({
                files: ['./frontend/src/styles/*.css', './frontend/src/styles/*.pcss']
            })

        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx|tsx|ts)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.(pcss|css)$/i,
                    use: [
                        (argv.mode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                url: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    config: path.resolve(__dirname, 'postcss.config.js')
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][ext]'
                    }
                },
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    exclude: /(node_modules|bower_components)/
                }
            ]
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false
                }),
                new CssMinimizerPlugin()
            ]
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'index.[contenthash].js',
            assetModuleFilename: 'images/[name][ext]',
            clean: true
        },
        devServer: {
            watchFiles: path.join('./frontend', 'src'),
            port: 9000
        }
    };
};
