import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 存储token
        token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''
    },
    mutations: {
        // 修改token，sessionStorage
        changeLogin(state, user) {
            state.token = user.token;
            localStorage.setItem('token', user.token);
        }
    }
})

export default store