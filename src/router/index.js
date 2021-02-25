import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/Login'
import PasswordLogin from "@/views/login/PasswordLogin"
import Found from '@/views/found/Found'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            component: Login,
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