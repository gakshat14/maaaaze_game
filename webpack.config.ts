// for now we haven't included happypack which would allow us to use multiple cores
// this is supposed to be useful in larger project.
// A base webpack config, which then will be used by other webpack config
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

/**
 * Specifying custom type for webpack config for defining devServer
 */
export interface IDevOptions {
    config: Configuration;
    devServer?: any;
}

/**
 * Specifying custom type for webpack config for defining devServer
 * @extends Configuration
 */
interface IOption extends Configuration {
    devServer?: any;
}

/**
 * @param {IDevOptions} options responsible for passing valid build option
 * @returns complete webpack config
 */
export default (options: IDevOptions) => {
    const config: IOption = {};

    // telling webpack to map everything under src folder
    config.context = path.resolve(__dirname, 'src');

    // list of extension that should be resolved and understood
    config.resolve = { extensions: ['.js', '.ts', '.tsx'] };

    // place from where the apoplication will start and as well as build

    config.entry = { maze_game: './index' };

    // place where the output will be stored
    config.output = {
        filename: '[name].[hash:8].js',
        // this is used when we are using code splitting with dynamic import
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        // Output location
        path: path.resolve(__dirname, 'dist', 'assets'),
    };

    /**
     * building instructions
     * specifying which all loaders to be used for specific file type
     */
    config.module = {
        rules: [
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { url: false } }],
            },
            ...options.config.module.rules,
        ],
    };

    config.plugins = [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[name].[hash].css',
        }),
        ...options.config.plugins,
    ];

    config.devtool = options.config.devtool;

    config.mode = options.config.mode;

    options.devServer && (config.devServer = options.devServer);

    options.config.optimization && (config.optimization = options.config.optimization);

    return config;
};
