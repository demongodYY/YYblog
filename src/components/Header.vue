<template>
    <header>
        <el-row class="continer" type="flex" align="middle" :gutter="15">
             <el-col :xs="5" :sm="3" :md="2" :lg="1">
                <img src="../assets/logo.png"/>
            </el-col>
            <el-col>
                <h2>YYBlog</h2>
            </el-col>
            <el-button class="logoutBtn"  type="text" size="large" @click = "handleLogout">注销</el-button>
        </el-row>
        
    </header>
</template>

<script>
    export default {
        name: 'header',
        methods: {
            handleLogout () {
                this.$kinvey.User.logout()
                .then(() => {
                    this.$router.replace('/');
                });
            }
        }
    };
</script>

<style lang="stylus" scoped>
    header
        height 4rem
        background-color rgb(32, 160, 255)
        color #E0E0E0    
    .continer
        height 100%
    img
        margin:8%
        height auto
        width 100%
    .logoutBtn
        color:#E0E0E0
        margin-right 3rem
    .logoutBtn:hover
        color:#FEFEFE
</style>


