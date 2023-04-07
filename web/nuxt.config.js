module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'Author', content: 'AirHua' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'image/logo/favicon.ico' },
    ],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.min.js',
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/js/controls/OrbitControls.js',
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js',
      },
    ],
  },
  server: {
    port: 8000,
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://server:3000/web/api',
  },
  modules: ['@nuxtjs/axios', '@nuxtjs/color-mode'],
  axios: {
    proxy: true,
    prefix: '/api', // baseURL
    credentials: true,
  },
  proxy: {
    '/api': {
      target: process.env.BASE_URL || 'http://server:3000/web/api',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/',
      },
    },
    '/uploads': {
      target: 'http://server:3000/web/api',
      changeOrigin: true,
    },
  },
  loading: '~/components/LoadingTab.vue',
  css: ['~assets/css/main.css', '~assets/css/iconfont.css'],
  plugins: [
    { src: '@/plugins/common.js', ssr: false },
    { src: '@/plugins/component.js', ssr: true },
    { src: '@/plugins/router.js', ssr: false },
  ],
};
