import Vue from 'vue'
import Router from 'vue-router'

import Start from '@/views/start/Start'
import PasswordLogin from '@/views/start/PasswordLogin'
import Home from '@/views/home/Home'
import Found from '@/views/home/found/Found'
import Mine from '@/views/home/mine/Mine'
import CloudVillage from '@/views/home/cloud-village/CloudVillage';
import Recommend from '@/views/home/found/shortcut-menu/Recommend';

Vue.use(Router);

const router = new Router({
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
                },
            ]
        },
        {
            path: '/recommend',
            name: 'recommend',
            component: Recommend,
        },
    ]
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//     if (to.path === '/passwordlogin') {
//         next();
//     } else {
//         let token = sessionStorage.getItem('token');
//         if (token === null || token === '') {
//             next('/start');
//         } else {
//             next();
//         }
//     }
// });

export default router;