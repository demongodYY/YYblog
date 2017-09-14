// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Kinvey from 'kinvey-html5-sdk';
import store from './store';

const AppKey = 'kid_BJVrF0RKW';
const AppSecret = '4cac002c973f44278b1c42787f3c8893';
import BlogHeader from '@/components/Header';

Kinvey.init({
    appKey: AppKey,
    appSecret: AppSecret
});
Vue.prototype.$kinvey = Kinvey;
Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.component('BlogHeader', BlogHeader);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: {
        App
    }
});
