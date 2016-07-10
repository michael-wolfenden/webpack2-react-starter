const deepmerge = require('deepmerge')

const webpackConfig = require('./webpack.config.development')
const specsGlob = 'src/app/**/*.specs.js'

// clear plugins
webpackConfig.plugins = []

// to debug open http://127.0.0.1:9876/debug.html and check console
module.exports = config => config.set({
    // specsGlob relative to this path
    basePath: '../',

    // run browserless
    browsers: ['PhantomJS'],

    // use the mocha test framework
    frameworks: ['mocha'],

    // report results in this format
    reporters: ['mocha'],

    // load spec files
    files: [
        specsGlob,
    ],

    // preprocess with webpack
    preprocessors: {
        [specsGlob]: ['webpack'],
    },

    // silence bundling output except exceptions
    // ie. from eslint
    webpackMiddleware: {
        noInfo: true,
        stats: {
            errors: true,
            errorDetails: true,
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            source: false,
            warnings: false,
        },
    },

    // use this webpack configuration
    webpack: deepmerge(webpackConfig, {
        module: {
            // some libraries don't like being run through babel.
            noParse: [
                /node_modules(\\|\/)acorn/,
            ],

            loaders: [
                {
                    query: {
                        plugins: [
                            // needed for power-assert
                            // (ref:https://github.com/power-assert-js/babel-plugin-espower)
                            'babel-plugin-espower',
                        ],
                    },
                },
                {
                    // needed for power-assert
                    test: /\.json$/,
                    loader: 'json',
                },
            ],
        },

        // the following are needed for enzyme
        // (ref: https://github.com/airbnb/enzyme/blob/master/docs/guides/karma.md)
        externals: {
            cheerio: 'window',
            'react/addons': true,
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true,
        },
    }),
})

