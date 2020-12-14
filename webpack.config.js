const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');
const {
    WebpackOptionsApply
} = require('webpack');

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer')
]

// our own plugin
class RunAfterCompile {
    apply(compiler) {
        compiler.hooks.done.tap('Copy images', function () {
            fse.copySync('./app/assets/images', './docs/assets/images')

        });
    }
}



let cssConfig = {
    // check if files end with .css
    test: /\.css$/i,
    // use css-loader to bundle files and style-loader to apply css
    use: ['css-loader?url=false', {
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                plugins: postCSSPlugins
            }
        }
    }]
}

// use HtmlWebPackPlugin for multiple pages
let pages = fse.readdirSync('./app').filter(function (file) {
    return file.endsWith('html');
}).map(function (page) {
    return new HtmlWebpackPlugin({
        filename: page,
        template: `./app/${page}`
    })
})

// config object is for the shared code between dev & build
let config = {
    // looks in directory for App.js (may contain multiple files)
    entry: './app/assets/scripts/App.js',
    // use the html-webpack-plugin so that html can link to css regardless of css filename
    plugins: pages,
    // tells webpack what to do with file types other than js
    module: {
        rules: [
            cssConfig
        ]
    }
}

if (currentTask == 'dev') {
    // add an item to the beginning of the cssConfig array
    cssConfig.use.unshift('style-loader')
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
    config.module.rules.push({
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    })

    cssConfig.use.unshift(MiniCssExtractPlugin.loader)
    // add plugin to the end of the postCSSPlugins array
    // compresses the css file 25kb to 13kb
    postCSSPlugins.push('cssnano')
    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs')
    }
    config.mode = 'production'
    // help visitors download less data in the long run
    config.optimization = {
        splitChunks: {
            chunks: 'all'
        }
    }
    config.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.[chunkhash].css'
        }),
        new RunAfterCompile()
    )
}

module.exports = config;