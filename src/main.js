import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// ************offline*******************
// import 'vuetify/dist/vuetify.min.css'
// import 'roboto-fontface/css/roboto/roboto-fontface.css'
// import '@mdi/font/css/materialdesignicons.css'
import '@babel/polyfill'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
