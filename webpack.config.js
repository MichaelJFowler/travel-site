const path = require('path');

const postCSSPlugins = [
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
]

module.exports = {
    // looks in directory for App.js (may contain multiple files)
    entry: './app/assets/scripts/App.js',
    // outputs the js sripts into a single file called bundled.js
    output: {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    },
    // stops error message about mode not being set
    mode: 'development',
    // to watch the file and automatically rebuild on file change
    watch: true,
    // tells webpack what to do with file types other than js
    module: {
        rules: [{
            // check if files end with .css
            test: /\.css$/i,
            // use css-loader to bundle files and style-loader to apply css
            use: ['style-loader', 'css-loader?url=false', {
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        plugins: postCSSPlugins
                    }
                }
            }]
        }]
    }
}