import buildMyConfig from './webpack.config';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import path from 'path';

const config: Configuration = {};

config.module = {
    rules: [
        {
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader',
            options: {
                configFile: 'tsconfig-dev.json',
                // this model enables makes ts-loader to transpile the code
                // which will omit type checking, this is delegated to a separate process
                // with ForkTsCheckerWebpackPlugin
                transpileOnly: true,
                experimentalWatchApi: true,
            },
            exclude: /node_modules/,
        },
    ],
};

config.mode = 'development';

config.plugins = [
    // // we are now using dll but to utilise it we need to generate dll bundle as well
    // new DllReferencePlugin({
    //     context: '.',
    //     manifest: require('./tmp/vendors.json'),
    // }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        inject: 'body',
        hash: true,
    }),
    // importing dll file to html file
    // new AddAssetHtmlPlugin({
    //     filepath: path.resolve(__dirname, 'tmp', '*.dll.js'),
    // }),
    // separate type checking plugin
    // async: true allows webpack to complete build even if type checking fails
    // setting async as false because we want to return error when type checking fails and avoid user to use app
    // in future we might move away from async: false, i'm still figuring out a way to produce error
    new ForkTsCheckerWebpackPlugin({
        async: false,
        typescript: { configFile: path.resolve(__dirname, 'tsconfig-dev.json') },
    }),
];
config.devtool = 'source-map';

const devServer = {
    client: {
        logging: 'info',
        overlay: true,
        progress: true,
    },
    port: 9000,
    hot: 'only',
    host: '0.0.0.0',
    compress: true,
    historyApiFallback: true,
};

export default buildMyConfig({
    config,
    devServer,
});
