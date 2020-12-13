const currentTask = process.env.npm_lifecycle_event;
const path = require('path');

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer')
]

// config object is for the shared code between dev & build
let config = {
    // looks in directory for App.js (may contain multiple files)
    entry: './app/assets/scripts/App.js',

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

if (currentTask == 'dev') {
    // outputs the js sripts into a single file called bundled.js
    config.output = {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    }
    // leverage webpack-dev-server module
    config.devServer = {
        // update HTML changes on the fly
        before: function (app, server) {
            server._watch('./app/**/*.html')
        },
        contentBase: path.join(__dirname, 'app'),
        // hot module replacement - inject js on the fly
        hot: true,
        port: 3000,
        // allow network devices to connect to server
        // 192.168.101.101:3000
        host: '0.0.0.0'
    }
    // stops error message about mode not being set
    config.mode = 'development'
}

if (currentTask == 'build') {
    config.output = {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'dist')
    }
    config.mode = 'production'
    // help visitors download less data in the long run
    /*config.optimization = {
        splitChunks: {
            chunks: 'all'
        }
    }*/
}

module.exports = config;