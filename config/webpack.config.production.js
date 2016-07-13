const { optimize, HashedModuleIdsPlugin } = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { dependencies } = require('../package.json')
const InlineManifestWebpackPlugin = require('./inline-manifest-webpack-plugin')
const PATHS = require('./paths')

const webpackConfig = {

    entry: {
        app: PATHS.entryFile,
        // create a seperate vendor bundle with all our package.json dependencies, excluding
        // babel-runtime as the transform-runtime babel will add the required es2015 shims
        // to the app bundle
        vendor: Object
            .keys(dependencies)
            .filter(dependency => dependency !== 'babel-runtime'),
    },

    output: {
        path: PATHS.distDir,
        filename: 'assets/js/[name].[chunkhash].js',
        chunkFilename: '[chunkhash].js',
    },

    devtool: 'source-map',

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
                test: /\.js?$/,
                include: PATHS.appDir,
                loader: 'eslint',
            },
        ],

        loaders: [
            {
                test: /\.js?$/,
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
                        // (ref: https://github.com/thejameskyle/babel-react-optimize)
                        'react-optimize',
                    ],
                    plugins: [
                        // (ref: https://babeljs.io/docs/plugins/transform-runtime/)
                        'transform-runtime',
                    ],
                },
            },
        ],
    },

    // fail build if any eslint errors or warnings
    eslint: {
        failOnWarning: true,
        failOnError: true,
    },

    plugins: [
        // remove dist directory
        new CleanWebpackPlugin(PATHS.distDir, {
            root: PATHS.rootDir,
        }),

        // use hashed filename instead of webpack generated id's for imports
        // this aids with long term caching
        // (ref: https://github.com/webpack/webpack/issues/1315)
        new HashedModuleIdsPlugin(),

        // generate 3 bundles
        // * app (from main entry file)
        // * vendor (from project.json package dependencies)
        // * manifest (entry chunk that includes the webpack runtime and chunkhash mappings)
        //   this will be injected in the main index.html page
        // (ref: https://github.com/webpack/webpack/tree/master/examples/chunkhash)
        new optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),

        // inject references to the generated bundles (both js and css) into
        // the index html template, minify and copy to dist folder
        new HtmlWebpackPlugin({
            template: PATHS.index,
            excludeChunks: ['manifest'],
            inject: true,
            minify: {
                removeComments: false,
                collapseWhitespace: true,
            },
        }),

        // inject manifest bundle from above into the index html template
        // prevents changes in app bundle changing the hash of the vendor
        // bundle and vice versa.
        // (ref: https://github.com/webpack/webpack/issues/1315)
        new InlineManifestWebpackPlugin(),

        new CopyWebpackPlugin([{
            from: PATHS.publicDir,
            to: PATHS.distDir,
        }]),
    ],
}

module.exports = webpackConfig

