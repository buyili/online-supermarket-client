const fs = require('fs')
const path = require('path')

module.exports =  fs.readdirSync(__dirname).reduce((pages, dir) =>{
    const fullPath = path.join(__dirname,dir);
    if(fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath,'app.js'))){
        const prePath = path.join('src',dir);
        const page = {
            entry:path.join(prePath,'app.js')
        };
        page.template = path.join(prePath,'index.html');
        page.filename = path.join(dir,'index.html');
        pages[dir] = page;
    }
    return pages;
},{})