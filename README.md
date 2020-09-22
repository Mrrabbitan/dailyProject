# dailyProject

看到一篇还不错的文章，翻译（也不是完全翻译，还是改动了一点点让它变得更易理解）了一波

你会在本篇学到什么

    如何安装配置webpack如何安装配置babel如何安装react如何创建两种React Component --- 容器/展示组件在html文件中引用webpack生成的bundle文件如何安装使用webpack dev server

初始化项目

首先我们先给项目创建一个文件夹 webpack-react-tutorial：

    mkdir webpack-react-tutorial && cd webpack-react-tutorial

接着在这个文件夹下创建一个 src 的子文件夹：

    mkdir -p src

初始化项目：

    npm init -y

如何安装配置 webpack

    webpack

webpack 是一款非常有用的前端打包工具，了解如何使用它是 React 开发者的基础，因为 webpack 可以将 React 组件转化成几乎所有浏览器都可以运行的 JS code。

让我们先来安装它：

    npm i webpack --save-dev

你可能会需要 webpack-cli，所以也先装上

    npm i webpack-cli --save-dev

接着在 package.json 里添加 webpack 的指令

    "scripts": {
      "build": "webpack --mode production"
    }

到目前为止还不需要写 webpack 的配置文件。

老版的 webpack 会自动去找配置文件，但是从 webpack 4 之后，你就需要自己去匹配需要的配置文件了。

下面我们来安装和配置 Babel 来编译我们的代码。

初始化 Babel

为什么要使用 Babel?

React Component 大多是用 JS ES6 语法来写的，而浏览器没办法运行 ES6 的语法，所以就需要工具来将 ES6 的代码转化成浏览器可以运行的代码（通常是 es5 的语法）。

webpack 本身是不会做这件事情的，需要靠转换器：loader。

一个 webpack loader 作用就是把输入进去的文件转化成指定的文件格式输出。其中 babel-loader 负责将传入的 es6 文件转化成浏览器可以运行的文件。

babel-loader 需要利用 Babel，所以需要预先将 Babel 配置好。

    babel preset env：将ES6的代码转成ES5(注意：babel-preset-es2015已经被废弃了)

2.babel preset react: 将 JSX 语法编译成 JS

接着安装这两个依赖：

    npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev

不要忘了配置 Babel! 首先要在 webpack-react-tutorial 文件夹里新建一个文件.babelrc，内容为

    {
      "presets": ["@babel/preset-env", "@babel/preset-react"]
    }

到这个时候，就可以写一小部分 webpack 的配置文件了。

创建一个新的文件 webpack.config.js，内容为

    const path = require('path');

    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
      }

      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      }
    };

这个 webpack 的配置很简单。意思就是所有以.js 结尾的文件都会用 babel-loader 把 ES6 编译转化成 ES5 的文件。

同时它定义了输入文件的路径为 src/index.js，输出为 dist/bundle.js。webpack 4 里这两行代码你不写也行，webpack 会默认帮你加，但是为了代码可读性，我们还是把它加上。

配置完成之后，我们就可以开始写 React 组件了。
写 React 组件

这里会写两种 React 组件：容器、展示组件。如果不了解这两种组件概念的同学可以先了解一下。

简单来说: 容器跟展示组件是 React 组件的两种模式。

容器组件: 一般比较重数据处理的逻辑会写在这，比如监听外界传入（例如 redux） state 的变化，或者处理组件内部的 state，等等。

展示组件：顾名思义，就是仅仅用来展示的。它一般都是一个纯箭头函数，接受容器组件通过 props 传来的数据，然后展示我们希望展示的 html 结构。

在下面的例子中，你会看到它们长啥样。

在本节中，我们来创建只有 text input 的超级简单的 React 表单。

首先先把 React 库引进来：

    npm i react react-dom --save

然后创建两个子文件夹来分别放 React 容器/展示组件

    mkdir -p src/js/components/{container,presentational}

接着我们来写一个容器组件，它有下面的特点

有自己的 state

2. 渲染一个 html 表单

将这个容器组件放在 container 里

    touch src/js/components/container/FormContainer.js

容器组件的代码如下：

    import React, { Component } from "react";
    import ReactDOM from "react-dom";

    class FormContainer extends Component {
      constructor() {
    super();

    this.state = {
          title: ""
    };
    }

      render() {
    return (
    <form id="article-form">
    </form>
    );
    }
    }

    export default FormContainer;

到目前为止，这个组件还没啥用，它只是一个包裹着子展示组件的外壳。

所以我们来定义一下子组件 Input 吧。

我们知道 html input 有下列的属性：

    typeclassidvaluerequired

所有的这些属性都由容器组件通过 props 传给它，这种组件叫做 controlled component。

写一个 react 组件，最好给它加上 Prop Types，这样一来可以做输入的数据类型检测，二来别人用你的组件，可以很快知道这个组件需要什么 input。

安装 prop-types

    npm i prop-types --save-dev

接着写这个展示组件

    import React from "react";
    import PropTypes from "prop-types";
    const Input = ({ label, text, type, id, value, handleChange }) => (
      <div className="form-group">
        <label htmlFor={label}>{text}</label>
        <input
          type={type}
          className="form-control"
          id={id}
          value={value}
          onChange={handleChange}
          required
        />
      </div>
    );
    Input.propTypes = {
      label: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      handleChange: PropTypes.func.isRequired
    };
    export default Input;

到这一步我们就可以在容器组件里渲染 Input 这个子组件了

    import React, { Component } from "react";
    import ReactDOM from "react-dom";
    import Input from "../presentational/Input";
    class FormContainer extends Component {
      constructor() {
        super();
        this.state = {
          seo_title: ""
        };
        this.handleChange = this.handleChange.bind(this);
      }
      handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
      }
      render() {
        const { seo_title } = this.state;
        return (
          <form id="article-form">
            <Input
              text="SEO title"
              label="seo_title"
              type="text"
              id="seo_title"
              value={seo_title}
              handleChange={this.handleChange}
            />
          </form>
        );
      }
    }
    export default FormContainer;

写好组件之后，就可以用 webpack 来打包这些代码啦。

由于前面我们已经定义了 webpack 入口文件是 ./src/index.js

所以我们先创建一个 index.js 文件，在里面引入 React 组件

    import FormContainer from "./js/components/container/FormContainer";

写好之后，激动人心的时刻到了!

我们终于可以通过运行

    npm run build

来生成打包文件，由于我们在配置里定义了输出文件为：dist/bundle.js，所以一切顺利的话， 你现在应该可以看到一个新生成的 dist 文件，里面有一个 bundle.js 文件。
在 HTML 文件引入 bundle

为了展示我们的 React 组件，我们需要让 webpack 生成一个 html 文件。上面我们生成的 bundle.js 就会放在这个 html 文件的<script>标签里。

webpack 需要两个工具来生成这个 html 文件：html-webpack-plugin 跟 html-loader

首先添加这两个依赖：

    npm i html-webpack-plugin html-loader --save-dev

然后更新 webpack 的配置文件

    const HtmlWebPackPlugin = require("html-webpack-plugin");
    module.exports = {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
          }
        ]
      },
      plugins: [
        new HtmlWebPackPlugin({
          title: 'Set Up Project',
          filename: "./index.html"
        })
      ]
    };

index.html 是我们的模板文件，里面定义了 React Component 需要插入进入的容器<div>create-article-form</div>，不要忘了在 FormContainer 里用 React.render 绑定这个。

    <!doctype html>
    <html>
      <head>
        <title>Getting Started</title>
      </head>
      <body>
        <div id='create-article-form'>

        </div>
      </body>
    </html>

在./src/js/components/container/FormContainer.js 加上下面的代码：

    const wrapper = document.getElementById("create-article-form");
    wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;

最后，在跑一次构建：

    npm run build

这时候在 dist 文件夹里就会看到生成的 html 文件，由于 html-webpack-plugin，bundle 文件会被自动注入 html 里。

在浏览器里打开./dist/index.html，你会看到这个 React 表单。
webpack dev Server

目前为止，我们来遗留一个问题：每次修改文件的时候，都需要重新跑一次编译

    npm run build

这样是很麻烦的，我们想达到的效果是自动重新编译。

达到这个目标很简单，只需要 3 行配置就可以启动运行一个开发服务器。

启动服务器之后 webpack 就会在浏览器里启动你的应用，而且当你修改保存代码之后，webpack dev server 还会自动刷新浏览器的窗口。

在启动 webpack dev server 前，需要先安装

    npm i webpack-dev-server --save-dev

打开 package.json 加入 start script

    "scripts": {
      "start": "webpack-dev-server --open --mode development",
      "build": "webpack"
    }

保存这个文件，最后在跑这个命令

    npm start

你会在你的浏览器里看到你的应用。

接下来你可以随意修改一下文件内容，会看到 webpack dev server 会自动刷新浏览器窗口。
总结

通过上面的学习，我们已经看到如何从零用 webpack 与 Babel 搭建一个 React 项目，包括
如何安装配置 webpack 如何安装配置 Babel 如何安装 React 如何创建 React 容器/展示组件如何在 html 里插入 bundle 文件如何安装和配置 webpack dev server
