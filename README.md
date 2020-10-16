## vue3-typescript-template
演练`vue3.0`新特性写法，搭建`vue3.0`初始demo, 项目中实现登录、token验证、登出、路由权限控制，搭配easy-mock模拟用户数据，cookie验证，实现composition api运用场景及如何结合ts类型推导

## 技术总结
1. vue version: 3.0
2. vuex version: 4.0
3. vue-router version: 4.0
4. easy-mock
5. axios
6. js-cookie

## 未来
- 根据特性完成更多指引学习
- 合成api封装公共模块
- 分支mobile、admin环境定制

## Project Structure

```bash
├── public                     # public static assets (directly copied)
│   │── favicon.ico            # favicon
│   │── manifest.json          # PWA config file
│   └── index.html             # index.html template
├── src                        # main source code
│   ├── api                    # api service
│   ├── assets                 # module assets like fonts, images (processed by webpack)
│   ├── components             # global components
│   ├── composabale            # global composition api
│   ├── helper                 # global helper
│   ├── router                 # router
│   ├── store                  # store
│   ├── types                  # typescript type
│   ├── views                  # views
│   ├── App.vue                # main app component
│   ├── main.ts                # app entry file
|   ├── globalConfig.ts        # global config
│   └── shims-vue.d.ts         # type definition shims vue
│   └── shims-vuex.d.ts        # type definition shims vuex
├── tests/                     # tests
├── .browserslistrc            # browserslist config file (to support Autoprefixer)
├── .editorconfig              # editor code format consistency config
├── .env.xxx                   # env variable configuration
├── .eslintrc.js               # eslint config
├── .prettierrc.js             # prettier config
├── babel.config.js            # babel config
├── cypress.json               # e2e test config
├── package.json               # package.json
├── postcss.config.js          # postcss config
├── tsconfig.json              # typescript config
└── vue.config.js              # vue-cli config
```

## Project setup

With [yarn](https://yarnpkg.com/lang/en/) or [npm](https://www.npmjs.com/get-npm)

#### Install dependencies

```bash
yarn install
```

#### Compiles and hot-reloads for development

```bash
yarn run serve
```

#### Compiles and minifies for production

```bash
yarn run build:prod
```

#### Lints and fixes files

```bash
yarn run lint
```

#### Run your unit tests

```bash
yarn run test:unit
```

#### Run your end-to-end tests

```bash
yarn run test:e2e
```

#### Customize Vue configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions
