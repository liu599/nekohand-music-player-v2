
// ref: https://umijs.org/config/
const {REACT_APP_ENV} = process.env;
const APP_VERSION = require("./package.json").version
const APP_BUILD_TIME = new Date()
const APP_SHOW_TIME = `${APP_BUILD_TIME.getFullYear()}${(APP_BUILD_TIME.getMonth()+1)>10?(APP_BUILD_TIME.getMonth()+1):`0${(APP_BUILD_TIME.getMonth()+1)}`}`

export default {
  targets: {
    ie: 11,
    chrome: 79,
    firefox: false,
    safari: false,
    edge: 20,
    ios: false,
  },
  antd: false,
  publicPath: "/",
  runtimePublicPath: true,
  exportStatic: {},
  history: {
    type: 'browser'
  },
  //fastRefresh: {},
  // mfsu: {},
  // ssr: { },
  dva: {
    immer: false,
    hmr: false,
    skipModelValidate: false,
  },
  // dynamicImport: {
  //   loading: '@/components/PageLoading/loading',
  //   player: '@/components/player/player',
  // },
  title: 'Nekohand Music',
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    APP_VERSION,
    APP_SHOW_TIME,
    NEKOHAND: "nekohand",
    USERDATA: "userData",
  },
  devServer: {
    port: 5051,
    writeToDisk: false,
  }
}
