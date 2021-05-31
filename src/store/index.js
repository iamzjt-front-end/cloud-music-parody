import Vue from 'vue'
import Vuex from 'vuex'
import {playMode} from "@/common/config";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',// 存储token
        playList: [], // 当前播放列表
        currentIndex: -1, // 当前播放歌曲index
        playingState: false, // 播放状态 false-暂停 true-正在播放
        fullScreen: false, // 全屏还是小屏
        mode: playMode.sequence, // 播放模式
        chartsList: [], // 排行榜歌单
        singerChartsList: [], // 歌手榜
        expVersion: localStorage.getItem('expVersion') ? JSON.parse(localStorage.getItem('expVersion')) : '', // 是否是体验版
    },
    mutations: {
        // 修改token，localStorage
        changeLogin(state, data) {
            localStorage.setItem('token', data);
        },
        updatePlayList(state, data) {
            state.playList = data;
        },
        updateCurrentIndex(state, data) {
            state.currentIndex = data;
        },
        updatePlayingState(state, data) {
            state.playingState = data;
        },
        updateFullScreen(state, data) {
            state.fullScreen = data;
        },
        updateMode(state, data) {
            state.mode = data;
        },
        updateChartsList(state, data) {
            state.chartsList = data;
        },
        updateSingerChartsList(state, data) {
            state.singerChartsList.push(data);
        },
        updateExpVersion(state, data) {
            localStorage.setItem('expVersion', data);
        }
    },
    getters: {
        // 当前播放歌曲
        currentSong: state => {
            return state.playList[state.currentIndex] || {};
        },
    },
    actions: {
        selectPlay({commit}, {list, index}) {
            commit('updatePlayList', list);
            commit('updateCurrentIndex', index);
            commit('updateFullScreen', true);
            commit('updatePlayingState', true);
        }
    }
})

export default store