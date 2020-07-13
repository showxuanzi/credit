let compressionWebpackPlugin = require("compression-webpack-plugin"); //引入gzip依赖，gzip对文件进一步压缩
module.exports = {
    // 打包文件访问的相对目录，独立项目，通过项目的根目录访问
    publicPath: "/credit",//在github上运行
    // publicPath: "./",
    // 在子域下访问项目，打包后在dist文件夹下创建map文件夹，把所有文件放进去
    // publicPath: "/map/",
    // 打包时是否生成.map文件，生成环境不生成，开发环境生成
    productionSourceMap: process.env.NODE_ENV === "development" ? true : false,
    // 配置webpack
    configureWebpack: config => {
        // config是vuecli的默认配置
        Object.assign(config,{
            externals:{ //打包排除的三方包，用cdn加速的方式引入到项目中
                // vue: "Vue",
                // axios: "axios",
                // element: "element-ui"
            }
        });
        // 自定义插件
        let plugins = [
            new compressionWebpackPlugin({
                algorithm: "gzip", // 压缩方式，以gzip压缩
                test: /\.js$|\.css$/, // 对css和js文件压缩
                threshold: 10240 // 对大于10k的文件压缩
            })
        ];
        // 线上环境压缩
        if(process.env.NODE_ENV === "production"){
            config.mode = "production";
            // 配置包含vuecli的默认配置和自定义插件
            config.plugins = [...config.plugins,...plugins];
        }else{
            config.mode = "development";
        }
    }
}