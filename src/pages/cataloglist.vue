<template>
    <div class="cataloglist-page">
        <el-breadcrumb separator="/" class="pagenavigate">
            <el-breadcrumb-item>基础设置</el-breadcrumb-item>
            <el-breadcrumb-item>类目设置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table
            :data="tagslist"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column label="日期" width="180" align="center">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    {{ scope.row.date }}
                </template>
            </el-table-column>
            <el-table-column prop="tagsName" label="标签名称" width="180" align="center">
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
                    date:"2017-02-10",
                    tagsName:"web前端",
                },{
                    date:"2017-02-11",
                    tagsName:"职场生涯",
                }]
            }
        },
        methods:{
            handleSelectionChange:function(){

            },
            handleDelete:function(index,row){

            },
            handleEdit:function(index,row){

            }
        }
    }
</script>
<style scoped lang="less">
    .cataloglist-page{
        padding:0px 10px 10px 10px;
        .pagenavigate{
            margin-bottom:10px;
            font-size:14px;
            line-height:2em;
            border-bottom:2px solid #C0CCDA;
        }
    }
</style>