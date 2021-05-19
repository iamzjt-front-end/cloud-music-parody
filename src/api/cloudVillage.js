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
    // 获取视频播放地址
    videoUrlGet(params) {
        return axios.get(`${base.baseURL}/video/url`, {
            params: params
            //必选参数 : id: 视频 的 id
        });
    },
    // 获取推荐视频
    recVideoGet(params) {
        return axios.get(`${base.baseURL}/video/timeline/recommend`, {
            params: params
        });
    },
    // 获取相关视频
    relatedVideoGet(params) {
        return axios.get(`${base.baseURL}/related/allvideo`, {
            params: params
        });
        // 必选参数 : id: 视频 的 id
    },
    // 获取视频详情
    videoDetailGet(params) {
        return axios.get(`${base.baseURL}/video/detail`, {
            params: params
        });
        // 必选参数 : id: 视频 的 id
    },
    // 获取视频点赞转发评论数数据
    videoDetailInfoGet(params) {
        return axios.get(`${base.baseURL}/video/detail/info`, {
            params: params
        });
        // 必选参数 : vid: 视频id
    },

    // post提交
    // articleDetail1 (params) {
    //     return axios.post(`${base.baseURL}/accesstoken`, qs.stringify(params));
    // }
}

export default cloudVillage;