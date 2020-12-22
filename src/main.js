import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

import Confirm from './components/dialog'
Vue.use(Confirm)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
