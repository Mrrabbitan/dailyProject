const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const { getThemeVariables } = require('antd/dist/theme')
const apiMocker = require('mocker-api')
const mocker = require('./mocker/index.ts')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  devServer: {
    before(app) {
      apiMocker(app, path.resolve('./mocker/index.ts'), {
        proxy: {
          '/repos/*': 'https://api.github.com/',
          '/:owner/:repo/raw/:ref/*': 'http://127.0.0.1:2018',
        },
        changeHost: true,
      })
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_module/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                modifyVars: getThemeVariables({
                  dark: true, // 开启暗黑模式
                  compact: true, // 开启紧凑模式
                }),
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.scss$/,
      //   include: [path.join(__dirname, 'src')],
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'scss-loader',
      //       options: {
      //         implementation: require('css'),
      //         sassOptions: {
      //           fiber: require('fibers'),
      //         },
      //         javascriptEnabled: true,
      //       },
      //     },
      //   ],
      // },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css', '.less'],
    // alias: {
    //   react: pathToReact,
    // },
  },
  devServer: {
    publicPath: '/',
    contentBase: './dist', // 服务启动在哪一个文件夹下
    open: true, // 启动服务时，自动打开浏览器
    port: 8080, // 端口号
    // proxy 跨域时模拟接口代理
    hot: true, // devServer开启Hot Module Replacement的功能
    hotOnly: true, // 即便HMP的功能没有生效，浏览器也不能自动刷新
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new CleanWebpackPlugin(),
    // new HtmlWebPackPlugin({
    //   filename: 'index.html',
    //   template: './src/html/index.html',
    //   chunks: ['index'],
    // }),
  ],
}
