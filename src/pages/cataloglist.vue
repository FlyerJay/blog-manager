<template>
    <div class="cataloglist-page">
        <el-breadcrumb separator="/" class="pagenavigate">
            <el-breadcrumb-item>基础设置</el-breadcrumb-item>
            <el-breadcrumb-item>分类设置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button-group class="toolbar">
            <el-button type="info" icon="plus" @click="addDialogShow=true">新增</el-button>
        </el-button-group>
        <el-dialog title="新增分类" v-model="addDialogShow" size="tiny">
            <el-input placeholder="请输入分类名称" v-model="catalogAdd" class="input-group">
                <template slot="prepend">文章分类</template>
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="addCatalog">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑分类" v-model="updateDialogShow" size="tiny">
            <el-input placeholder="请输入分类名称" v-model="catalogUpdate" class="input-group">
                <template slot="prepend">文章分类</template>
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="updateCatalog">确 定</el-button>
            </div>
        </el-dialog>
        <el-table
            :data="cataloglist"
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
                    {{ scope.row.createdAt | dateFilter }}
                </template>
            </el-table-column>
            <el-table-column prop="catalogName" label="分类名称" width="180" align="center">
            </el-table-column>
            <el-table-column label="操作" align="left">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import R from '../ajax'
    export default{
        data () {
            return {
                cataloglist:[],
                addDialogShow:false,
                updateDialogShow:false,
                catalogAdd:'',
                catalogUpdate:'',
                catalogIdUpdate:0,
            }
        },
        methods:{
            handleSelectionChange:function(){

            },
            handleDelete:function(index,row){
                var self = this;
                R.deleteCatalog(this,{
                    catalogId:row.catalogId
                },function(res){
                    if(res.code == 200){
                        R.getCatalogList(self,{
                        },function(res){
                            if(res.code == 200){
                                self.cataloglist = res.data.list;
                            }
                        })
                        self.$message('删除成功');
                        self.addDialogShow = false;
                    }
                })
            },
            handleEdit:function(index,row){
                var self = this;
                self.updateDialogShow = true;
                self.catalogUpdate = row.catalogName;
                self.catalogIdUpdate = self.cataloglist[index].catalogId;
            },
            addCatalog:function(){
                var self = this;
                R.addCatalog(this,{
                    catalogName:self.catalogAdd
                },function(res){
                    if(res.code == 200){
                        R.getCatalogList(self,{
                        },function(res){
                            if(res.code == 200){
                                self.cataloglist = res.data.list;
                            }
                        })
                        self.$message('新增成功！');
                        self.addDialogShow = false;
                    }else{
                        self.cataloglist = [];
                    }
                })
            },
            updateCatalog:function(){
                var self = this;
                R.updateCatalog(this,{
                    catalogId:self.catalogIdUpdate,
                    catalogName:self.catalogUpdate
                },function(res){
                    if(res.code == 200){
                        R.getCatalogList(self,{
                        },function(res){
                            if(res.code == 200){
                                self.cataloglist = res.data.list;
                            }
                        })
                        self.$message('修改成功！');
                        self.updateDialogShow = false;
                    }else{
                        self.cataloglist = [];
                    }
                })
            }
        },
        mounted:function(){
            var self = this;
            R.getCatalogList(this,{
            },function(res){
                if(res.code == 200){
                    self.cataloglist = res.data.list;
                }else{
                    self.cataloglist = [];
                }
            })
        },
        filters:{
            dateFilter:function(val){
                return val.substring(0,10);
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
        .toolbar{
            margin-bottom: 5px;
        }
    }
</style>