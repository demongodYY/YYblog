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
                            })"
                            stripe
                            :row-key="postList.id"
                            style="width: 100%">
                            <el-table-column  label="时间" width="150">
                              <template scope="scope">
                                <el-icon name="time"></el-icon>
                                <span style="margin-left: 10px">{{ scope.row.time }}</span>
                              </template>
                            </el-table-column>
                            <el-table-column  label="标题" >
                              <template scope="scope">
                                <router-link :to="`/article?${ scope.row.id }`">
                                  {{ scope.row.title }}
                                </router-link>
                              </template>
                            </el-table-column>

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
                    }
                ]
            };
        },
        methods: {
            listArticle () {
                const userId = '59b21e3c8be17b6304398e51';
                const query = this.$kinvey.Query();
                query.equelTo('creator', userId);
                const dataStore = this.$kinvey.DataStore.collection('articles');
                dataStore.find(query).subscribe();
            }
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

