<template>
    <el-row class="content">
        <el-col :xs="24" :sm="{span: 6,offset:9}">
            <span class="title">
                欢迎登陆
            </span>
            <el-row>
                <el-input
                    v-model="username"
                    placeholder="用户名"
                    type="text">
                </el-input>
                <el-input
                    v-model="password"
                    placeholder="密码"
                    type="password">
                </el-input>
                <el-button type="primary" @click="handleSignIn">登陆</el-button>
                <el-button type="primary" @click="handleSignUp">注册</el-button>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'Login',
        data () {
            return {
                username: '',
                password: ''
            };
        },
        methods: {
            handleSignIn () {
                this.$kinvey.User.login({
                    username: this.username,
                    password: this.password
                })
                .then(res => {
                    this.$router.replace('/post');
                })
                .catch(err => {
                    console.log(err);
                });
            },
            handleSignUp () {
                const user = new this.$kinvey.User();
                user.signup({
                    username: '测试',
                    password: '123456',
                    email: 'test@test.com'
                }).then(user => {
                    this.$router.replace('/post');
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        mounted () {
            const activeUser = this.$kinvey.User.getActiveUser();
            if (activeUser !== null) {
                this.$router.replace('/post');
            }
        }
    };
</script>

<style lang="stylus" scoped>
    .el-row.content
        padding 1rem
    span.title
        font-size 1.5rem
    .el-input
        margin 1rem 0
    .el-button
        widows 100%
        margin-top 1rem
    .content
        margin-top 5%
</style>

