import Vue from 'vue'
import Router from 'vue-router'

import Start from '@/views/login/Start'
import PasswordLogin from "@/views/login/PasswordLogin"
import Found from '@/views/found/Found'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/start',
        },
        {
            path: '/start',
            component: Start,
        },
        {
            path: '/passwordlogin',
            component: PasswordLogin,
        },
        {
            path: '/found',
            component: Found,
        }
    ]
});