module.exports = {
    publicPath: './',
    devServer: {
        port: 4978,
        open: true,
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