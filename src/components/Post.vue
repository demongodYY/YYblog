<template slot-scoped>
    <el-row class="continer">
        <blog-header></blog-header>
        <el-col class="menu-vertical" :xs="7" :sm="4" :md="4" :lg="3">
            <el-menu  default-active="-1">
                <el-menu-item index="-1" @click="handleSubjectChange('all')">全部</el-menu-item>
                <el-menu-item v-for="(subject, index) in subjectList" :key="index" :index="''+index" @click="handleSubjectChange(subject)">{{ subject }}</el-menu-item>
            </el-menu>
        </el-col>
        <el-col class="content" :xs="17" :sm="20" :md="20" :lg="21">
                <el-tabs v-loading.fullscreen.lock="fullscreenLoading">
                    <el-table 
                        v-loading="fullscreenLoading"    
                        :data="postList.filter((post) => {
                            if(this.subject === 'all') {
                                return true;
                            } else {
                                return (post.type === subject)
                            }
                        })"
                        stripe
                        :show-header = "false"
                        :row-key="postList.id"
                        @current-change="handleCurrentChange"
                        style="width: 100%">
                        <el-table-column >
                            <template scope="scope">
                            <!-- <el-icon name="time"></el-icon> -->
                            <span class="listTime">{{ scope.row.time }}</span>
                            <span class="listTitle">{{ scope.row.title }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tabs>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'Post',
        data () {
            return {
                userId: '',
                userList: [
                ],
                subjectList: [],
                postList: [],
                subject: 'all',
                fullscreenLoading: true
            };
        },
        methods: {
            listArticle () {
                // const userId = this.userId;
                // const query = new this.$kinvey.Query();
                // query.equalTo('_acl.creator', userId);
                // query.fields = ['_id', 'title', 'type'];
                const dataStore = this.$kinvey.DataStore.collection('articles');
                dataStore.find().subscribe((res) => {
                    let subjectList = [];
                    for (let val of res) {
                        val.type = (val.type === '' ? val.type = '未分类' : val.type);
                        if (subjectList.indexOf(val.type) === -1) {
                            subjectList.push(val.type);
                        }
                    }
                    this.subjectList = subjectList;
                    this.postList = res;
                    if (this.postList.length > 0) {
                        this.fullscreenLoading = false;
                    }
                    // console.log(res);
                }, (err) => {
                    console.log(err);
                });
            },
            handleCurrentChange (val) {
                this.$router.push({path: 'article', query: {id: val._id}});
            },
            handleSubjectChange (subject) {
                this.subject = subject;
            }
        },
        mounted () {
            this.listArticle();
        }
    };
</script>

<style lang="stylus" scope>
    .continer
        height:100%
    .menu-vertical
        height:100%
    .el-menu
        height :100%
    .content
        padding 2%
</style>

