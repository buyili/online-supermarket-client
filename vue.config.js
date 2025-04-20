const PagesConfig = require("./src/pagesConfig")

var path = require('path');

console.log(PagesConfig);

//vue.config.js
module.exports = {
    baseUrl:"/dist/",
    filenameHashing: false,
    pages: {
        ...PagesConfig,
        index: {
            entry: "src/main.js",
            template: "public/index.html",
            filename: 'index.html'
        },
    },
    devServer: {
        port: 8082,
    }
}