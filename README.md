# lab3d-starter

## 关于

对本项目进行 clone ，以进行 lab3d 虚拟实验的开发。
本项目使用 Vue Cli 进行构建，因此集成了 Vue Cli 的一系列开箱即用的服务，包括但不限于：

- 由于集成了 Webpack，所以可以有效缩小项目体积，减少访问时的网络请求次数；
- 使用 ES Modules 来管理模块，方便进行代码管理；
- 集成了 webpack-dev-server 方便开发；
- 使用 Vue 快速进行 GUI 构建。

此外还进行了以下特殊配置：

- 禁止使用 var 声明变量，必须使用 const 或 let，否则将会报错；
- 支持使用 Webpack loader 打包 .glb 文件，这类文件会被单独打包到 /assets 文件夹。

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
