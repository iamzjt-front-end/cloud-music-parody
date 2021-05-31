import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// 解决Vue-Router升级导致的Uncaught (in promise)问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/start',
            name: 'start',
            component: () => import('@/views/start/Start'),
            meta: {
                title: "开始页",
                index: 1
            }
        },
        {
            path: '/password-login',
            name: 'password-login',
            component: () => import('@/views/start/PasswordLogin'),
            meta: {
                title: "密码登录",
                index: 2
            }
        },
        {
            path: '/email-login',
            name: 'email-login',
            component: () => import('@/views/start/EmailLogin'),
            meta: {
                title: "邮箱登录",
                index: 3
            }
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/home/Home'),
            meta: {
                title: "主页",
                index: 4
            },
            children: [
                {
                    path: '/',
                    redirect: '/found',
                },
                {
                    path: '/found',
                    name: 'found',
                    component: () => import('@/views/home/found/Found'),
                    meta: {
                        title: "发现",
                        index: 5
                    },
                },
                {
                    path: '/mine',
                    name: 'mine',
                    component: () => import('@/views/home/mine/Mine'),
                    meta: {
                        title: "我的",
                        index: 5
                    },
                },
                {
                    path: '/cloud-village',
                    name: 'cloud-villlage',
                    component: () => import('@/views/home/cloud-village/CloudVillage'),
                    meta: {
                        title: "云村",
                        index: 5
                    },
                },
            ]
        },
        {
            path: '/day-recommend',
            name: 'day-recommend',
            component: () => import('@/views/home/found/shortcut-menu/DayRecommend'),
            meta: {
                title: "推荐歌单",
                index: 6
            },
        },
        {
            path: '/rec-list',
            name: 'rec-list',
            component: () => import('@/views/home/found/rec-list/RecList'),
            meta: {
                title: "推荐歌单",
                index: 7
            },
        },
        {
            path: '/song-list-square',
            name: 'song-list-square',
            component: () => import('@/views/home/found/rec-list/SongListSquare'),
            meta: {
                title: "歌单广场",
                index: 6
            },
        },
        {
            path: '/rank-list',
            name: 'rank-list',
            component: () => import('@/views/home/found/charts/RankList'),
            meta: {
                title: "排行榜歌单",
                index: 7
            },
        },
        {
            path: '/charts',
            name: 'charts',
            component: () => import('@/views/home/found/charts/Charts'),
            meta: {
                title: "排行榜",
                index: 6
            },
        },
        {
            path: '/video-play',
            name: 'video-play',
            component: () => import('@/views/home/cloud-village/VideoPlay'),
            meta: {
                title: "视频播放",
                index: 6
            },
        },
    ]
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    let expVersion = store.state.expVersion;

    if (!expVersion) { // 如果是体验版，到哪都可以
        next();
    } else {
        let token = localStorage.getItem('token');
        if (token) {
            next();
        } else if (to.path == '/start' || to.path == '/password-login' || to.path == '/email-login') {
            next();
        } else {
            next('/start');
        }
    }
});

export default router;