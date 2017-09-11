// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Kinvey from 'kinvey-html5-sdk';

const AppKey = 'kid_BJVrF0RKW';
const AppSecret = '4cac002c973f44278b1c42787f3c8893';
Kinvey.init({
    appKey: AppKey,
    appSecret: AppSecret
});
Vue.prototype.$kinvey = Kinvey;
Vue.config.productionTip = false;

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
