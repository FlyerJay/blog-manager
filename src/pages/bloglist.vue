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
            :data="bloglist"
            border
            style="width: 100%">
            </el-table-column>
            <el-table-column label="发布日期" width="150" align="center">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    {{ scope.row.createdAt | dateFilter}}
                </template>
            </el-table-column>
            <el-table-column label="文章分类" width="120" align="center">
                <template scope="scope">
                    {{ scope.row.Catalog.catalogName | dateFilter}}
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" width="240" align="center">
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
        <el-pagination
            layout="prev, pager, next"
            :total="totalCount"
            class="pagenation"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="changePage">
        </el-pagination>
    </div>
</template>
<script>
    import R from '../ajax'
    export default{
        data () {
            return {
                bloglist:[],
                pageSize:12,
                totalCount:24,
                currentPage:1,
            }
        },
        methods:{
            handleDelete:function(index,row){
                var self = this;
                R.deleteBlog(this,{id:row.blogId},function(res){
                    if(res.code == 200){
                        self.$message('删除成功');
                        self.getBlogList(1);
                    }
                })
            },
            handleEdit:function(index,row){
                this.$router.replace("/manager/blogedit/"+row.blogId);
            },
            addBlog:function(){
                 this.$router.replace("/manager/blogadd");
            },
            getBlogList:function(page){
                var self = this;
                R.getBlogList(this,{page:page,pageSize:self.pageSize},function(res){
                    if(res.code == 200){
                        self.bloglist = [];
                        self.bloglist = res.data.list
                        self.totalCount = res.pageinfo.totalCount;
                    }else{
                        self.bloglist = []
                    }
                })
            },
            changePage:function(currentPage){
                this.getBlogList(currentPage);
            }
        },
        mounted:function(){
            this.getBlogList(1);
        },
        filters:{
            dateFilter:function(val){
                return val.substring(0,10);
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
        .pagenation{
            text-align: center;
            margin-top:5px;
        }
    }
</style>