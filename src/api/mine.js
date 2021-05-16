/**
 * mine模块接口列表
 */
import base from './base'; // 导入接口域名列表
import axios from '@/axios'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const mine = {
    // 获取账号信息
    userAccountGet(params) {
        return axios.get(`${base.baseURL}/user/account`, {
            params: params
        });
    },
    // 获取用户详情
    userDetailGet(params) {
        return axios.get(`${base.baseURL}/user/detail`, {
            params: params
        });
    },
    //获取用户等级信息
    userLevelGet(params) {
        return axios.get(`${base.baseURL}/user/level`, {
            params: params
        });
    },
    // 喜欢音乐列表
    likeListGet(params) {
        return axios.get(`${base.baseURL}/likelist`, {
            params: params
        });
    },
    // 获取用户信息 , 歌单，收藏，mv, dj 数量
    userSubcountGet(params) {
        return axios.get(`${base.baseURL}/user/subcount`, {
            params: params
        });
    },

    // post提交
    // articleDetail1 (params) {
    //     return axios.post(`${base.baseURL}/accesstoken`, qs.stringify(params));
    // }
}

export default mine;