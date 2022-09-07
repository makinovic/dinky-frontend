export default {

   // Defaults options
   tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true,
  },
  
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Dinky Island',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome',
    '@nuxtjs/vuetify',
  ],
  fontawesome:{
    icons:{
      solid:true,
      brands:true
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',   
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth-next',
    ['nuxt-gmaps', {
      key: 'AIzaSyAOA3KstqWDfBpJoUuUxGs0umUOAYtB6YU',
      //you can use libraries: ['places']
    }]
    
  ],
  


  // auth: {
  //   strategies: {
  //     local: {
  //       token: {         
  //          required: false,
  //          type:false         
  //       },
  //       user: {
  //         property: false       
  //       },
  //       endpoints: {
  //         login: { url: '/api/login', method: 'post', propertyName: false },
  //         logout: { url: '/api/logout', method: 'post' },
  //         user: { url: '/api/user', method: 'get' }
  //       }
  //     }
  //   },
  //   localStorage: false
  // },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: 'http://dinky.local:8000',
        endpoints: {
        login: { url: '/api/login', method: 'post' },
        logout: { url: '/api/logout', method: 'post' },
        user: { url: '/api/user', method: 'get' }
        }
      },
    }
  },



  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {

    credentials: true,
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://dinky.local:8000',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  publicRuntimeConfig:{
    stripeKey: process.env.STRIPE_KEY
  }
}