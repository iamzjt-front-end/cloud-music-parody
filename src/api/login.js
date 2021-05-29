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
    // 邮箱登录
    emailLogin(params) {
        return axios.get(`${base.baseURL}/login`, {
            params: params
        });
    },
    // 退出登录
    logout(params) {
        return axios.get(`${base.baseURL}/logout`, {
            params: params
        });
    }

    // post提交
    // articleDetail1 (params) {
    //     return axios.post(`${base.baseURL}/accesstoken`, qs.stringify(params));
    // }
}

export default login;