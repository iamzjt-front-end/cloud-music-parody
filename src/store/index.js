import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 存储token
        token: ''
    },
    mutations: {
        tokenUpdate (state, token) {
            state.token = token;
        }
    }
})

export default store