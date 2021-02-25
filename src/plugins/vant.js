// 1.引入Vue
import Vue from 'vue'

// 2.按需导入 Vant 的组件
import {
    Checkbox,
    Form,
} from 'vant';

// 3.注册组件
Vue.use(Checkbox)
   .use(Form);
