import Vue from 'vue'
import Router from 'vue-router'

import Start from '@/views/start/Start'
import PasswordLogin from '@/views/start/PasswordLogin'
import Home from '@/views/home/Home'
import Found from '@/views/home/found/Found'
import Mine from '@/views/home/mine/Mine'
import CloudVillage from '@/views/home/cloud-village/CloudVillage';

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
            path: '/home',
            component: Home,
            children: [
                {
                    path: '/',
                    redirect: '/found',
                },
                {
                    path: '/found',
                    component: Found,
                },
                {
                    path: '/mine',
                    component: Mine,
                },
                {
                    path: '/cloud-village',
                    component: CloudVillage,
                }
            ]
        },
    ]
});