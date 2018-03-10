<template>
    <el-row class="content">
        <el-col :xs="24" :sm="{span: 6,offset:9}">
            <span class="title">
                欢迎登陆
            </span>
            <el-row>
                <el-input
                    v-model="signIn.username"
                    placeholder="用户名"
                    type="text">
                </el-input>
                <el-input
                    v-model="signIn.password"
                    placeholder="密码"
                    type="password">
                </el-input>
                <el-button type="primary" @click="handleSignIn">登陆</el-button>
                <el-button type="primary" @click="dialogVisible = true">注册</el-button>
                <el-dialog title="注册" :visible.sync="dialogVisible">
                    <el-form :model="signUp">
                        <el-form-item label="用户名" >
                          <el-input v-model="signUp.username" type="text"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" >
                          <el-input v-model="signUp.email" type="text"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                          <el-input v-model="signUp.password" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleSignUp">确 定</el-button>
                  </div>
                </el-dialog>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'Login',
        data () {
            return {
                signUp: {
                    username: '',
                    password: '',
                    email: ''
                },
                signIn: {
                    username: '',
                    password: ''
                },
                dialogVisible: false
            };
        },
        methods: {
            alertError (errorCode) {
                switch (errorCode) {
                case 409 :
                    this.$alert('该用户已经存在', `错误${errorCode}`);
                    break;
                case 401 :
                    this.$alert('用户名或密码出错啦!', `错误${errorCode}`);
                    break;
                default :
                    this.$alert('未知错误', `错误${errorCode}`);
                    break;
                }
            },
            handleSignIn () {
                this.$kinvey.User.login({
                    username: this.signIn.username,
                    password: this.signIn.password
                })
                .then(activeUser => {
                    this.$store.commit('getActiveUser', activeUser);
                    this.$router.replace('/editor');
                })
                .catch(err => {
                    console.log(err);
                    this.alertError(err.code);
                });
            },
            handleSignUp () {
                const user = new this.$kinvey.User();
                user.signup({
                    username: this.signUp.username,
                    password: this.signUp.password,
                    email: this.signUp.email,
                    first_name: 'public'
                }).then(activeUser => {
                    this.$store.commit('getActiveUser', activeUser);
                    this.dialogVisible = false;
                    this.$alert('赶快登录写下你的文章吧', '恭喜你,注册成功!', {
                        callback: () => {
                            this.$router.replace('/post');
                        }
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.alertError(error.code);
                });
            }
        },
        mounted () {
            const activeUser = this.$kinvey.User.getActiveUser();
            if (activeUser !== null) {
                this.$store.commit('getActiveUser', activeUser);
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

