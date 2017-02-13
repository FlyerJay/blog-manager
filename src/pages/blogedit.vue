<template>
    <div class="blogedit-page">
        <el-breadcrumb separator="/" class="pagenavigate">
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            <el-breadcrumb-item to="/manager/bloglist">文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="blog-info">
            <el-input placeholder="请输入文章标题" v-model="title" class="input-group" >
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
                id:0,
            }
        },
        methods:{
            getBlog:function(){
                var self = this;
                R.getBlog(this,{id:this.$route.params.id},function(res){
                    if(res.code == 200){
                        self.title = res.data.title;
                        for(var i=0;i<self.cataloglist.length;i++){
                            if(self.cataloglist[i].catalogId == res.data.catalogId){
                                break;
                            }
                        }
                        self.catalog = self.cataloglist[i].catalogName;
                        self.editor.$txt.html(res.data.article);
                        setTimeout(function(){
                            self.id = res.data.catalogId;
                        },0)//异步执行，防止被select事件的值覆盖掉
                    }
                })
            },
            getCatalogList:function(){
                var self = this;
                R.getCatalogList(this,{
                },function(res){
                    if(res.code == 200){
                        self.cataloglist = res.data.list;
                            self.getBlog();
                    }else{
                        self.cataloglist = [];
                    }
                })
            },
            saveBlog:function(){
                var self = this;
                var data = {
                    id:this.$route.params.id,
                    catalogId:self.id,
                    title:self.title,
                    article:self.editor.$txt.html()
                }
                R.updateBlog(this,data,function(res){
                    if(res.code == 200){
                         self.$message('修改成功');
                    }
                })
            },
            goBak:function(){
                this.$router.replace("/manager/bloglist");
            },
            onSelectChange:function(val){
                this.id = val;
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
            this.getCatalogList();
        },
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
        .toolbar{
            margin-top:5px;
        }
    }
</style>