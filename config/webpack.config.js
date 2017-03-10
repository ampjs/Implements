const BabiliPlugin = require("babili-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const pack = require('./../package.json');

let libFile = 'lib/Implements.min.js';

module.exports = {
    entry: {
        './../Implements': './Implements.js'
        // './test/tests': './test/tests.js'
    },
    output: {
        path: __dirname + '/../',
        filename: libFile,
        library: pack.name,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: []
    },
    plugins: [
        new BabiliPlugin(),
        new UglifyJSPlugin({
            mangle: {
                except: ['Implements']
            }
        })
    ]
};
