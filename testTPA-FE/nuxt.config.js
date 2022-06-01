require('dotenv').config()
const webpack = require('webpack')
module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'testTPA-FE',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/app-assets/vendors/css/vendors.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/app-assets/css/bootstrap.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/app-assets/css/bootstrap-extended.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/app-assets/css/colors.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/app-assets/css/components.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/app-assets/css/themes/dark-layout.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/app-assets/css/themes/bordered-layout.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/app-assets/css/themes/semi-dark-layout.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/app-assets/css/core/menu/menu-types/vertical-menu.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600' },
    ],
    script: [
      { src: '/app-assets/vendors/js/vendors.min.js', body: true },
      { src: '/app-assets/js/core/app-menu.js', body: true },
      { src: '/app-assets/js/core/app.js', body: true },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/feather', ssr: true },
    { src: '~plugins/globalFunction', ssr: true },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /**
     * add external plugins
     */
    //  vendor: ["jquery"],
    //  plugins: [
    //    new webpack.ProvidePlugin({
    //       $: "jquery",
    //       jQuery: 'jquery',
    //       'window.jQuery': 'jquery'
    //    })
    //  ],
    //  /*
    //  ** Run ESLint on save
    //  */
    //  extend (config, ctx) {

    //   if (ctx.isDev && ctx.client) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    
    //     const vueLoader = config.module.rules.find(({loader}) => loader === 'vue-loader')
    //     const { options: {loaders} } = vueLoader || { options: {} }
    //     if (loaders) {
    //       for (const loader of Object.values(loaders)) {
    //         changeLoaderOptions(Array.isArray(loader) ? loader : [loader])
    //       }
    //     }
    //     config.module.rules.forEach(rule => changeLoaderOptions(rule.use))
    //   }
    // }
  },

  axios: {
    baseURL: process.env.API_URL,
  }
}
