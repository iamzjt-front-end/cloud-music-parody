/**
 * found模块接口列表
 */
import base from './base'; // 导入接口域名列表
import axios from '@/axios'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const found = {
    // 轮播图图片获取
    bannerImage(params) {
        return axios.get(`${base.baseURL}/banner`, {
            params: params
        });
    },
    // 获取歌单
    songListImg(params) {
        return axios.get(`${base.baseURL}/user/playlist`, {
            params: params
        });
    },
    // post提交
    // articleDetail1 (params) {
    //     return axios.post(`${base.baseURL}/accesstoken`, qs.stringify(params));
    // }
}

export default found;