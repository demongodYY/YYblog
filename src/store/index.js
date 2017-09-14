import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        activeUser: null
    },
    mutations: {
        getActiveUser (state, user) {
            state.activeUser = user;
        }
    }
});
