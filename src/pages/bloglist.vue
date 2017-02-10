<template>
    <div class="bloglist-page">
        <el-breadcrumb separator="/" class="pagenavigate">
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button-group class="toolbar">
            <el-button type="info" icon="plus" @click="addBlog">新增</el-button>
        </el-button-group>
        <el-table
            :data="tagslist"
            border
            style="width: 100%">
            </el-table-column>
            <el-table-column label="发布日期" width="150" align="center">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    {{ scope.row.date}}
                </template>
            </el-table-column>
            <el-table-column prop="catalogName" label="文章分类" width="120" align="center">
            </el-table-column>
            <el-table-column prop="title" label="标题" width="180" align="center">
            </el-table-column>
            <el-table-column prop="hit" label="浏览次数" width="120" align="center">
            </el-table-column>
            <el-table-column prop="love" label="收藏次数" width="120" align="center">
            </el-table-column>
            <el-table-column label="操作" align="left">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default{
        data () {
            return {
                tagslist:[{
                    blogId:1,
                    date:"2017-02-10",
                    catalogName:"web前端",
                    hit:1,
                    love:1,
                    title:"文章1",
                },{
                    blogId:2,
                    date:"2017-02-11",
                    catalogName:"职场生涯",
                    hit:1,
                    love:1,
                    title:"文章2",
                }]
            }
        },
        methods:{
            handleDelete:function(index,row){

            },
            handleEdit:function(index,row){
                this.$router.push("../blogedit/"+row.blogId);
            },
            addBlog:function(){
                 this.$router.push("../blogadd");
            }
        }
    }
</script>
<style scoped lang="less">
    .bloglist-page{
        padding:0px 10px 10px 10px;
        .pagenavigate{
            margin-bottom:10px;
            font-size:14px;
            line-height:2em;
            border-bottom:2px solid #C0CCDA;
        }
        .toolbar{
            margin-bottom:5px;
        }
    }
</style>