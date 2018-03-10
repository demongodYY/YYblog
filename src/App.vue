<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: 'app',
        beforeCreate () {
            const activeUser = this.$kinvey.User.getActiveUser();
            if (!activeUser || !this.$store.state.activeUser) {
                console.log('no login');
                this.$kinvey.User.login({
                    username: 'guest',
                    password: 'guest'
                })
                .then(user => {
                    console.log('login!');
                    this.$store.commit('getActiveUser', user);
                    // this.$root.reload();
                    window.location.reload();
                    // this.$router.replace({ path: '/', query: { user: 'guest' } });
                });
            }
        }
    };
</script>

<style>
    html {
        height: 100%;
    }
    body {
        height:100%;
        margin: 0;
    }
    #app {
      /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      height:100%;
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      /* text-align: center; */
      /* color: #2c3e50; */
      /* margin-top: 60px;  */
    }

</style>
