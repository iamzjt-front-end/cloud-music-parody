/**
 * player模块接口列表
 */
import base from './base'; // 导入接口域名列表
import axios from '@/axios'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const player = {
    // 播放器获取歌曲详情
    songDetQry(params) {
        return axios.get(`${base.baseURL}/song/detail`, {
            params: params
        });
    },
    // 获取歌曲url
    songUrlGet(params) {
        return axios.get(`${base.baseURL}/song/url`, {
            params: params
        });
    },

    // post提交
    // articleDetail1 (params) {
    //     return axios.post(`${base.baseURL}/accesstoken`, qs.stringify(params));
    // }
}

export default player;