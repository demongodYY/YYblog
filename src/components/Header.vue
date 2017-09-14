<template>
    <header>
        <el-row class="continer" type="flex" align="middle" :gutter="70">
             <el-col :xs="5" :sm="3" :md="2" :lg="1">
                <avatar class = "imgAvatar" :username="username" ></avatar>
            </el-col>
            <el-col>
                <h2>{{ username }}'s Blog</h2>
            </el-col>
            <router-link to="/">
              <el-tooltip class="item" effect="dark" content="回到首页" placement="bottom-start">
                <el-button class="headerBtn"  style="float: right;" type="text" icon="caret-left"></el-button>
              </el-tooltip>
            </router-link>
            <router-link to="/editor">
              <el-tooltip class="item" effect="dark" content="写新文章" placement="bottom-start">
                <el-button class="headerBtn"  style="float: right;" type="text" icon="edit"></el-button>
              </el-tooltip>
            </router-link>
            <el-tooltip class="item" effect="dark" content="注销" placement="bottom-start">
              <el-button class="headerBtn"  type="text" size="large" @click = "handleLogout" icon="close"></el-button>
            </el-tooltip>
        </el-row>

    </header>
</template>

<script>
  import Avatar from 'vue-avatar/dist/Avatar';

  export default {
      name: 'header',
      components: {
          'avatar': Avatar
      },
      methods: {
          handleLogout () {
              this.$kinvey.User.logout()
              .then(() => {
                  this.$store.commit('getActiveUser', null);
                  this.$router.replace('/');
              });
          }
      },
      data () {
          return {
              username: ''
          };
      },
      mounted () {
          this.username = this.$store.state.activeUser.username;
      }
  };
</script>

<style lang="stylus" scoped>
    header
        height 4rem
        background-color rgb(32, 160, 255)
        color #E0E0E0
        padding 0 1.5rem;
    .continer
        height 100%
    .headerBtn
        color:#E0E0E0
        margin-right : 2rem
    .headerBtn:hover
        color:#FEFEFE
</style>


