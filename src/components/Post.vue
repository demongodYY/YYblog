<template>
    <el-row class="continer">
        <el-col class="menu-vertical" :xs="7" :sm="4" :md="4" :lg="3">
            <el-menu  default-active="-1">
                <el-menu-item index="-1">自己</el-menu-item>
                <el-menu-item v-for="(user, index) in userList" :key="user._id" :index="''+index" @click="handleUserChange(user._id)">{{ user.username }}</el-menu-item>
            </el-menu>
        </el-col>
        <el-col class="content" :xs="17" :sm="20" :md="20" :lg="21">
                <el-tabs >
                    <el-tab-pane v-for="(subject, index) in subjectList"  :key="index" :name="''+index" :label="subject">
                        <el-table
                            :data="postList.filter((post) => {
                                return (post.type === subject)
                            })"
                            stripe
                            :show-header = "false"
                            :row-key="postList.id"
                            @current-change="handleCurrentChange"
                            style="width: 100%">
                            <el-table-column >
                              <template scope="scope">
                                <el-icon name="time"></el-icon>
                                <span class="listTime">{{ scope.row.time }}</span>
                                <span class="listTitle">{{ scope.row.title }}</span>
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
                userId: '59b21e3c8be17b6304398e51',
                userList: [
                ],
                subjectList: [],
                postList: []
            };
        },
        methods: {
            listArticle () {
                const userId = this.userId;
                const query = new this.$kinvey.Query();
                query.equalTo('_acl.creator', userId);
                query.fields = ['_id', 'title', 'type'];
                const dataStore = this.$kinvey.DataStore.collection('articles');
                dataStore.find(query).subscribe((res) => {
                    for (let val of res) {
                        if (this.subjectList.indexOf(val.type) === -1) {
                            this.subjectList.push(val.type);
                        }
                    }
                    this.postList = res;
                }, (err) => {
                    console.log(err);
                });
            },
            listUser () {
                const query = new this.$kinvey.Query();
                query.equalTo('first_name', 'public');
                this.$kinvey.User.lookup(query).subscribe((users) => {
                    console.log(users);
                    this.userList = users;
                }, (err) => {
                    console.log(err);
                });
            },
            handleCurrentChange (val) {
                this.$router.push({path: 'article', query: {id: val._id}});
            },
            handleUserChange (id) {
                this.userId = id;
                this.listArticle();
            }
        },
        mounted () {
            this.listUser();
            this.listArticle();
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

