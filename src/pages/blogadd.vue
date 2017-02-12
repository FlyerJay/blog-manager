<template>
    <div class="blogadd-page">
        <el-breadcrumb separator="/" class="pagenavigate">
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            <el-breadcrumb-item to="../bloglist">文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="blog-info">
            <el-input placeholder="请输入文章标题" v-model="title" class="input-group">
                <template slot="prepend">文章标题</template>
                <template slot="append" style="width:10%">
                    <el-select v-model="catalog" placeholder="请选择" @change="onSelectChange">
                        <el-option
                        v-for="item in cataloglist"
                        :label="item.catalogName"
                        :value="item.catalogId"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </template>
            </el-input>
            <div class="blog-editor">
                <div id="blogEditor"></div>
            </div>
        </div>
        <el-button-group class="toolbar" :span="24">
            <el-button type="info" icon="circle-check" @click="saveBlog">保存</el-button>
            <el-button type="info" icon="circle-close" @click="goBak">返回</el-button>
        </el-button-group>
    </div>
</template>
<script>
    import R from '../ajax'
    export default{
        data () {
            return {
                title:'',
                cataloglist:[],
                catalog:'',
                catalogId:0,
                blogId:'',
            }
        },
        methods:{
            saveBlog:function(){
                
                var self = this;
                if(self.blogId){
                    var data = {
                        id:self.blogId,
                        catalogId:self.id,
                        title:self.title,
                        article:self.editor.$txt.html()
                    }
                    if(!self.title){
                        self.$message('请添加标题');
                        return false;
                    }
                    if(self.catalogId == 0){
                        self.$message('请选择文章分类');
                        return false;
                    }
                    if(self.editor.$txt.html().length <=10){
                        self.$message('内容过少');
                        return false;
                    }
                    R.updateBlog(this,data,function(res){
                        if(res.code == 200){
                            self.$message('修改成功');
                        }
                    })
                }else{
                    var data = {
                        catalogId:self.catalogId,
                        title:self.title,
                        article:self.editor.$txt.html()
                    }
                    if(!self.title){
                        self.$message('请添加标题');
                        return false;
                    }
                    if(self.catalogId == 0){
                        self.$message('请选择文章分类');
                        return false;
                    }
                    if(self.editor.$txt.html().length <=10){
                        self.$message('内容过少');
                        return false;
                    }
                    R.addBlog(this,data,function(res){
                        if(res.code == 200){
                            self.$message('保存成功');
                            self.blogId = res.data.blogId;
                        }
                    })
                }
            },
            goBak:function(){
                this.$router.go(-1);
            },
            onSelectChange:function(val){
                this.catalogId = val;
            },
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
            var otherHeight = (($(".pagenavigate").css("height")).replace("px","") - 0) + (($(".input-group").css("height")).replace("px","") - 0) + (($(".toolbar").css("height")).replace("px","") - 0)
            $("#blogEditor").css('height',windowHeight - otherHeight -70 + 'px');
            R.getCatalogList(this,{
            },function(res){
                if(res.code == 200){
                    self.cataloglist = res.data.list;
                }else{
                    self.cataloglist = [];
                }
            })
        }
    }
</script>
<style scoped lang="less">
    .blogadd-page{
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
        .toolbar{
            margin-top:5px;
        }
    }
</style>