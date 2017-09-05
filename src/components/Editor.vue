<template>
    <div class="container">
        <el-input v-model="title" placeholder="请输入标题"></el-input>
        <div id="editor">
        </div>
    </div>
</template>

<script>
    import Quill from 'quill';
    export default {
        data () {
            return {
                title: '',
                ctx: {},
                quill: {}
            };
        },
        methods: {
            update () {
                this.ctx = this.quill.getContents();
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
    @import '~quill/dist/quill.core.css';
    @import '~quill/dist/quill.snow.css';
    div.ql-container.ql-snow {
        border:none;
    }
    .ql-toolbar {
        background-color: #E0E0E0;
    }
    .ql-editor{
        min-height:20rem;
    }
    .el-input__inner {
        height:3.5rem;
        font-size:1.5rem;
    }
</style>