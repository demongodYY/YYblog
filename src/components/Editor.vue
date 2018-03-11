<template>

    <div class="container">
        <blog-header></blog-header>
        <el-input class="title-input" v-model="title" placeholder="请输入标题" >

            
        </el-input>
                      <el-select
                v-model="type"
                slot="prepend"
                filterable=""
                allow-create
                placeholder="分类">
                <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         <el-button size="large" slot="append" icon="upload" @click="handleCommitCtx"></el-button>
        <div id="editor">
        </div>
    </div>
</template>

<script>
    import Quill from 'quill';
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';

    export default {
        data () {
            return {
                title: '',
                ctx: {},
                quill: {},
                types: [{
                    value: '情感',
                    label: '情感'
                }, {
                    value: '生活',
                    label: '生活'
                }, {
                    value: '运动',
                    label: '运动'
                }],
                type: ''
            };
        },
        methods: {
            update () {
                this.ctx = this.quill.getContents();
            },
            handleCommitCtx () {
                const articles = this.$kinvey.DataStore.collection('articles');
                const article = {
                    title: this.title,
                    type: this.type,
                    content: this.ctx
                };
                articles.save(article)
                .then((res) => {
                    this.$router.push({path: 'article', query: { id: res._id }});
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        },
        mounted () {
            const toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{'list': 'ordered'}, { 'list': 'bullet' }],
                [{'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['clean'],                                         // remove formatting button
                ['link', 'image']
            ];
            this.quill = new Quill('#editor', {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow'
            });
            this.quill.on('text-change', this.update);
        }
    };
</script>

<style>
    div.ql-container.ql-snow {
        margin: 0 20%;
    }
    .ql-toolbar {
        background-color: #E0E0E0;
    }
    .ql-editor{
        background-color: #FAFAFA;
        min-height: 40rem;
        font-size:1.1rem;
        line-height:3rem;
    }
    .ql-editor img {
        clear: both;
        display: block;
        margin: 2rem auto;
    }
    .title-input .el-input__inner {
        height:3.5rem;
        font-size:1.5rem;
    }
    .title-input i{
        font-size: 1.5rem
    }
    .title-input i:hover{
        color:#BABABA
    }
    .el-select .el-input {
        width: 10rem;
    }
</style>
