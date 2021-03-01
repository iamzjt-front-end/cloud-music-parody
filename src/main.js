import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "vuex";
import api from './api'

Vue.prototype.$api = api; // 将api挂载到vue的原型上

// 引入Vant-UI
import 'plugins/vant'
import 'vant/lib/index.css'

// 引入animate.css动画库
import 'plugins/animate'

// 引入基础样式
import 'assets/scss/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
