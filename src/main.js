import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import dialog from './plugins/dialog'
Vue.use(dialog)

new Vue({
  render: h => h(App)
}).$mount('#app')
