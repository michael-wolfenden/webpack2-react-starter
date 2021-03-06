module.exports = {
    parser: 'babel-eslint',
    extends: 'airbnb',
    plugins: [
        'react',
    ],
    rules: {
        // http://eslint.org/docs/rules/semi
        // no semi-colons (YOLO) .. if you really want semicolons, remove this rule and run
        // '.\node_modules\.bin\eslint --fix src' from the app root to re-add
        semi: [2, 'never'],
        // http://eslint.org/docs/rules/indent
        // indent 4 spaces (rather than airbnb's default of 2)
        indent: [2, 4, { SwitchCase: 1 }],
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
        // indent 4 spaces (rather than airbnb's default of 2)
        'react/jsx-indent': [2, 4],
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
        // indent 4 spaces (rather than airbnb's default of 2)
        'react/jsx-indent-props': [2, 4],
    },
    env: {
        mocha: true,
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: 'config/webpack.config.development.js',
            },
        },
    },
}
