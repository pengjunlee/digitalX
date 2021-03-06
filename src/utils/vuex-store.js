import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')) : {
        user: {},
        token: ""
    },
    getters: {
        getCurUser: function (state) {
            return state.user.nickName ? state.user.nickName : state.user.name;
        },
        getMenus: function (state) {
            return state.user.menus;
        }
        ,
        getToken: function (state) {
            return state.token;
        }
    },
    mutations: {
        updatestateUser(state, newUser) {
            state.user = newUser;

        },
        updatestateToken(state, newToken) {
            state.token = newToken;
            console.log("mutations: " + store.state.token);
        }
    },
    actions: {
        updateUserAction: function ({ commit }, newUser) {
            commit("updatestateUser", newUser);
        },
        updateTokenAction: function ({ commit }, newToken) {
            commit("updatestateToken", newToken);
        }


    }
})

export default store;