import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 存储token
        Authorization: ''
    },
    mutations: {
        AuthorizationUpdate (state, token) {
            state.Authorization = token;
        }
    }
})

export default store