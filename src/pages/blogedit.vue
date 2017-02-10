<template>
    <div class="blogedit-page">
        <el-breadcrumb separator="/" class="pagenavigate">
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            <el-breadcrumb-item to="../bloglist">文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="blog-info">
            <el-input placeholder="请输入文章标题" v-model="title" class="input-group">
                <template slot="prepend">文章标题</template>
                <template slot="append" style="width:10%">
                    <el-select v-model="catalog" placeholder="请选择">
                        <el-option
                        v-for="item in cataloglist"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </template>
            </el-input>
            <div class="blog-editor">
                <div id="blogEditor"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data () {
            return {
                title:'',
                cataloglist:[
                    {
                        label:'web前端',
                        value:1,
                    },
                    {
                        label:'职场生活',
                        value:2,
                    }
                ],
                catalog:'',
            }
        },
        methods:{
        },
        mounted:function(){
            var self = this;
            self.editor = new wangEditor('blogEditor');
            self.editor.config.uploadImgUrl = '/upload';
            self.editor.config.uploadParams = {
                token: 'abcdefg',
                user: 'wangfupeng1988'
            };
            self.editor.config.uploadHeaders = {
                'Accept' : 'text/x-json'
            };
            self.editor.create();
            var windowHeight = document.documentElement.clientHeight;
            var otherHeight = (($(".pagenavigate").css("height")).replace("px","") - 0) + (($(".input-group").css("height")).replace("px","") - 0)
            $("#blogEditor").css('height',windowHeight - otherHeight -70 + 'px');
        }
    }
</script>
<style scoped lang="less">
    .blogedit-page{
        padding:0px 10px 10px 10px;
        .pagenavigate{
            margin-bottom:10px;
            font-size:14px;
            line-height:2em;
            border-bottom:2px solid #C0CCDA;
        }
        .blog-info{
            .input-group{
                margin-bottom:10px;
            }
        }
    }
</style>