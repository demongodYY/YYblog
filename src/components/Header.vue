<template>
    <header>
        <el-row class="continer" type="flex" align="middle" :gutter="15">
             <el-col :xs="4" :sm="3" :md="2" :lg="1">
                <img src="../assets/logo.png"/>
            </el-col>
            <el-col>
                <h2>Vue-Blog</h2>
            </el-col>
        </el-row>
        
    </header>
</template>

<script>
    export default {
        name: 'header'
    };
</script>

<style lang="stylus" scoped>
    header
        height 10%
        background-color rgb(32, 160, 255)
        color #C0CCDA
    
    .continer
        height 100%

    img
        margin:8%
        height auto
        width 100%
</style>


