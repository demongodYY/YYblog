import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Post from '@/components/Post';
import Editor from '@/components/Editor';
import Article from '@/components/Article';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'Post',
            component: Post
        },
        {
            path: '/editor',
            name: 'Editor',
            component: Editor
        },
        {
            path: '/article',
            name: 'Article',
            component: Article
        }
    ]
});
