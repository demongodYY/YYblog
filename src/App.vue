<template>
  <div id="app">
    <blog-header></blog-header>
    <router-view></router-view>
  </div>
</template>

<script>
    import BlogHeader from '@/components/Header';
    export default {
        name: 'app',
        components: {
            BlogHeader
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
