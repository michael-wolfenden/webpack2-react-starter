const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = require('./paths')

const webpackConfig = {

    entry: [
        // react hot loader 3
        'react-hot-loader/patch',
        PATHS.entryFile,
    ],

    devServer: {
        contentBase: PATHS.publicDir,
        // only display errors
        stats: 'errors-only',
    },

    resolve: {
        // set root resolver to app directory.
        // this allows using absolute paths for imports starting from
        // the app folder instead of relative paths
        // ie import { } from dir/dir/dir vs
        // ie import { } from ../../../
        modules: [
            'node_modules',
            PATHS.appDir,
        ],

        // HACK: webpack 2 removed the seperate root property that was used in webpack
        // and merged it into the modules array (see above).
        // (ref: https://gist.github.com/sokra/27b24881210b56bbaff7#resolving-options)
        // However, the eslint-import-resolver-webpack plugin doesn't work with webpack 2 yet
        // its still reads root resolves from the root property.
        // So to clarify, the root property below is being used by eslint and NOT webpack.
        // It should be removed when the eslint-import-resolver-webpack plugin is upgraded
        root: PATHS.appDir,
    },

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                include: PATHS.appDir,
                loader: 'eslint',
            },
        ],

        loaders: [
            {
                test: /\.js$/,
                include: PATHS.appDir,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    compact: true,
                    presets: [
                        'react',
                        // (ref: https://github.com/gajus/babel-preset-es2015-webpack)
                        'es2015-webpack',
                        // (ref: https://babeljs.io/docs/plugins/preset-stage-0/)
                        'stage-1',
                    ],
                    plugins: [
                        // react hot loader 3
                        'react-hot-loader/babel',
                        // (ref: https://babeljs.io/docs/plugins/transform-runtime/)
                        'transform-runtime',
                    ],
                },
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.index,
            inject: true,
        }),
    ],
}

module.exports = webpackConfig
