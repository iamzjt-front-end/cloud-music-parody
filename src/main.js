import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import api from './api'

Vue.prototype.$api = api; // 将api挂载到vue的原型上
// Vue.prototype.$bus = new Vue();

// 引入Vant-UI
import 'plugins/vant'
import 'vant/lib/index.css'

// 引入animate.css动画库
import 'plugins/animate'

// 引入基础样式
import 'assets/scss/index.scss'

// 移动端调试
import VConsole from 'vconsole';

Vue.prototype.$vconsole = new VConsole();

// 导入moment.js
import './plugins/moment'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
