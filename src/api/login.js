/**
 * login模块接口列表
 */
import base from './base'; // 导入接口域名列表
import axios from '@/axios'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const login = {
    // 密码登录
    passwordLogin(params) {
        return axios.get(`${base.baseURL}/login/cellphone`, {
            params: params
        });
    },
    // 获取账号信息
    userAccountQry(params) {
        return axios.get(`${base.baseURL}/user/account`, {
            params: params
        })
    },
    // 获取用户信息 , 歌单 , 收藏 , mv , dj 数量
    userSubcountQry(params) {
        return axios.get(`${base.baseURL}/user/subcount`, {
            params: params
        })
    },
    // post提交
    // articleDetail1 (params) {
    //     return axios.post(`${base.baseURL}/accesstoken`, qs.stringify(params));
    // }
}

export default login;