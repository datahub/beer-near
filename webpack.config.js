var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
module.exports = {
    entry: "./src/index.jsx",
    output: {
        filename: "./dist/bundle.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test : /\.jsx?/,
                loader : 'babel'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(["css?sourceMap", "sass?sourceMap"])
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("./dist/styles.css")
        //,new webpack.DefinePlugin({
        //    'process.env': {
        //      'NODE_ENV': JSON.stringify('production')
        //    }
        //})
    ]
}
