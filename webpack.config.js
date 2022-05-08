module.exports = {
    mode: "development",
    entry: './babel_result/index.js',
    output: {
        path: __dirname + '/dist',
        filename: "app.bundle.js"
    }
};
