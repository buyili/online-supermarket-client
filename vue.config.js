const ConfigPages = require("./src/configPages")

console.log(ConfigPages);

//vue.config.js
module.exports = {
    //baseUrl:"/src/counter"
    filenameHashing:false,
    pages:{
        ...ConfigPages,
        index:{
            entry:"src/main.js",
            template:"public/index.html",
            filename:'index.html'
        },
    }
}