const path = require('path');

module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    },
    mode: 'development',
    // to watch the file and automatically rebuild on file change
    watch: true
}