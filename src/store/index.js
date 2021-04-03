import Vue from 'vue'
import Vuex from 'vuex'
import {playMode} from "@/common/config";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 存储token
        token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
        playList: [], // 当前播放列表
        currentIndex: -1, // 当前播放歌曲index
        playing: false, // 播放状态
        fullScreen: false, // 全屏还是小屏
        sequenceList: [], // 顺序播放列表
        mode: playMode.sequence, // 播放模式
    },
    mutations: {
        // 修改token，sessionStorage
        changeLogin(state, data) {
            state.token = data;
            sessionStorage.setItem('token', data);
        },
        updatePlayList(state, data) {
            state.playList = data;
        },
        updateCurrentIndex(state, data) {
            state.currentIndex = data;
        }
    },
    getters: {
        // 当前播放歌曲
        currentSong: state => {
            return state.playList[state.currentIndex] || {};
        },
    },
})

export default store