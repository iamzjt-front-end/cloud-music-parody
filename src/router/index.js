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
            name: 'start',
            component: Start,
            meta: {
                title: "开始页",
                index: 1
            }
        },
        {
            path: '/passwordlogin',
            name: 'passwordlogin',
            component: PasswordLogin,
            meta: {
                title: "密码登录",
                index: 2
            }
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                title: "主页",
                index: 3
            },
            children: [
                {
                    path: '/',
                    redirect: '/found',
                },
                {
                    path: '/found',
                    name: 'found',
                    component: Found,
                    meta: {
                        title: "发现",
                        index: 4
                    },
                },
                {
                    path: '/mine',
                    name: 'mine',
                    component: Mine,
                    meta: {
                        title: "我的",
                        index: 4
                    },
                },
                {
                    path: '/cloud-village',
                    name: 'cloud-villlage',
                    component: CloudVillage,
                    meta: {
                        title: "云村",
                        index: 4
                    },
                },
            ]
        },
        {
            path: '/recommend',
            name: 'recommend',
            component: Recommend,
            meta: {
                title: "推荐歌单",
                index: 5
            },
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