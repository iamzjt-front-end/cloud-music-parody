import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 存储token
        token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
        songList: ''
    },
    mutations: {
        // 修改token，sessionStorage
        changeLogin(state, user) {
            state.token = user.token;
            localStorage.setItem('token', user.token);
        },
        updateSongList(state, arr) {
            state.songList = arr;
        }
    }
})

export default store