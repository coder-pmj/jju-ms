module.exports = {
    devServer: {
        publicPath: './',
        port: 4978,
        open: false,
        proxy: {
            '/api': {
                target: "http://localhost:3000",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ""
                }
            }
        }
    }
}