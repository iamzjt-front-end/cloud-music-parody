/**
 * cloudVillage模块接口列表
 */
import base from './base'; // 导入接口域名列表
import axios from '@/axios'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const cloudVillage = {
    // 获取视频标签列表
    videoTagGet(params) {
        return axios.get(`${base.baseURL}/video/group/list`, {
            params: params
        });
    },
    // 获取视频标签下的视频
    videoListGet(params) {
        return axios.get(`${base.baseURL}/video/group`, {
            params: params
            // 必选参数 : id: videoGroup 的 id
        });
    },
    // 获取推荐视频
    recVideoGet(params) {
        return axios.get(`${base.baseURL}/video/timeline/recommend`, {
            params: params
        });
    },

    // post提交
    // articleDetail1 (params) {
    //     return axios.post(`${base.baseURL}/accesstoken`, qs.stringify(params));
    // }
}

export default cloudVillage;