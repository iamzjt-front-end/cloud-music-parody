import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入Vant-UI
import './plugins/vant'
import 'vant/lib/index.css'

import 'assets/scss/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
