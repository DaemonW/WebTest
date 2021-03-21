import Vuex from 'vuex';
import user from '@/store/user'
import getters from "@/store/getters";
import app from "@/store/app";
import menu from "@/store/menu";
import group from "@/store/group"
import Vue from "vue";
import Cookies from 'js-cookie';

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        User: user,
        App: app,
        Menu: menu,
        Group: group,
    },
    state: {
        isMobile: false,
    },
    mutations: {
        markAsMobile: state => {
            state.isMobile = true;
            Cookies.set('mobile', true);
        },
        markAsPC: state => {
            state.isMobile = false;
            Cookies.set('mobile', false);
        }
    },
    getters,
});

export default store;
