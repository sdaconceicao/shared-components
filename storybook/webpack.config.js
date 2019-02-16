const path = require("path");

module.exports = {
    module: {
        rules: [
            {
                test: /\.css|scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"],
                include: path.resolve(__dirname, "../")
            },
            {
                test: /\.svg|png|jpg$/,
                loader: 'file-loader',
                query: {
                    name: 'lib/media/[name].[hash:8].[ext]'
                }
            },
        ]
    }
};