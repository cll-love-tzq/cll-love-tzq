const webpack = require("webpack");
module.exports ={
    publicPath:"./",
    lintOnSave:false,
    configureWebpack: {
        resolve: {
            alias: {
                //Src下的文件夹
                assets:"@/assets",
                components:"@/components",
                views:"@/views",
            },
        },
    },
};
