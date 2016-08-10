var path = require('path');

const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const sassLoaders = [
    'css-loader',
    'postcss-loader',
    'sass-loader'
]


module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015', 'stage-1']
            }
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
        }]
    },
    plugins: [
        new ExtractTextPlugin('./style.css'),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};
