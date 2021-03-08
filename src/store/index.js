import Vue from 'vue'
import Vuex from 'vuex'
import {playMode} from "@/common/config";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 存储token
        token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
        recSongList: '',
        playing: false, // 播放状态
        fullScreen: false, // 全屏还是小屏
        playList: [], // 播放列表
        sequenceList: [], // 顺序播放列表
        mode: playMode.sequence, // 播放模式
        currentIndex: -1,
    },
    mutations: {
        // 修改token，sessionStorage
        changeLogin(state, data) {
            state.token = data;
            sessionStorage.setItem('token', data);
        },
        updateSongList(state, data) {
            state.songList = data;
        }
    }
})

export default store