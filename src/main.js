import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入Vant-UI
import { Checkbox } from 'vant';
import { Form } from 'vant';

import 'vant/lib/index.css'

Vue.use(Checkbox);
Vue.use(Form);

// 引入animate.css动画库
import animated from 'animate.css'

Vue.use(animated)

// 引入基础样式
import 'assets/scss/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
