<template>
    <el-row class="continer">
        <el-col class="menu-vertical" :xs="7" :sm="4" :md="4" :lg="3">
            <el-menu  default-active="-1">
                <el-menu-item index="-1">自己</el-menu-item>
                <el-menu-item v-for="(user, index) in userList" :key="user.id" :index="''+index">{{ user.name }}</el-menu-item>
            </el-menu>
        </el-col>
        <el-col class="content" :xs="17" :sm="20" :md="20" :lg="21">
                <el-tabs >
                    <el-tab-pane v-for="(subject, index) in subjectList"  :key="index" :name="''+index" :label="subject">
                        <el-table 
                            :data="postList.filter((post) => {
                                return (post.subject === subject)
                            } )" 
                            stripe 
                            :row-key="postList.id"
                            @row-click = "console.log(this.row-key)"
                            style="width: 100%">
                            <el-table-column prop="title" label="标题" min-width="6"></el-table-column>
                            <el-table-column prop="time" label="时间" min-width="4"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'Post',
        data () {
            return {
                userList: [
                    {
                        id: 1,
                        name: '张三'
                    },
                    {
                        id: 2,
                        name: '李四'
                    },
                    {
                        id: 3,
                        name: '王二麻子'
                    }
                ],
                subjectList: [
                    '生活',
                    '情感',
                    '运动'
                ],
                postList: [
                    {
                        id: '1',
                        title: '人生啊,老是白金',
                        time: '2017-7-18',
                        subject: '生活'
                    },
                    {
                        id: '2',
                        title: '人生啊,钻石徘徊',
                        time: '2017-7-19',
                        subject: '生活'
                    },
                    {
                        id: '3',
                        title: '人生啊,上不了王者',
                        time: '2017-7-19',
                        subject: '情感'
                    },
                    {
                        id: '4',
                        title: '人生啊,上王者！',
                        time: '2017-7-19',
                        subject: '运动'
                    }
                ]
            };
        }
    };
</script>

<style lang="stylus" scoped>
    .continer
        height:100%
    .menu-vertical
        height:100%
    .el-menu
        height :100%
    .content
        padding 2%
</style>

