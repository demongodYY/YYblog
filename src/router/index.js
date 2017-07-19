import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Post from '@/components/Post';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/post',
            name: 'Post',
            component: Post
        }
    ]
});
