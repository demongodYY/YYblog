<template>
    <div class="container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">
                    {{ title }}
                </span>
                <el-button style="float: right;" size="large" slot="append" icon="edit"></el-button>
            </div>
            <div class="text item">
                <div id="editor">
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import Quill from 'quill';
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.bubble.css';
    export default {
        data () {
            return {
                title: '',
                ctx: {},
                quill: {},
                type: '',
                ctxId: ''
            };
        },
        methods: {
        },
        mounted () {
            const dataStore = this.$kinvey.DataStore.collection('articles', this.$kinvey.DataStoreType.Network);
            this.ctxId = this.$route.query.id;
            this.quill = new Quill('#editor', {
                readOnly: true,
                theme: 'bubble'
            });
            const stream = dataStore.findById(this.ctxId);
            stream.subscribe((res) => {
                if (res) {
                    console.log(res);
                    this.title = res.title;
                    this.ctx = res.content;
                    this.type = res.type;
                    this.quill.setContents(this.ctx);
                } else {
                    console.log('can not find article');
                }
            }, (err) => {
                console.log(err);
            });
        }
    };
</script>

<style>
    .el-card__body {
        padding: 0;
    }
    div.container {
        text-align: center;
    }
    div.ql-container {
        margin: 0 20%;
    }
    .ql-toolbar {

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
        margin: 1rem auto;
    }
    .title {
        height:2.5rem;
        font-size:2.5rem;
    }
</style>
