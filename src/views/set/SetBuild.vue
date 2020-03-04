<template>
    <div>
        <div>
            <el-input
                    class="addBuilding"
                    size="small"
                    placeholder="请输入新增楼栋名称"
                    prefix-icon="el-icon-plus"
                    v-model="building.name">
            </el-input>
            <el-button type="primary" size="small" style="margin-left: 8px" @click="addBuilding">新增楼栋</el-button>
        </div>
        <div>
            <el-table
                    :data="buildings"
                    @selection-change="handleSelectionChange"
                    border
                    stripe
                    class="buildTable">
                <el-table-column
                        type="selection"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="ID"
                        width="60">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="楼栋名称"
                        width="250">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间"
                        width="90">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" size="small" class="buildDelete" @click="deleteMany" :disabled="multipleSelection.length==0">批量删除</el-button>
        </div>
        <div>
            <el-dialog
                    title="修改楼栋名称"
                    :visible.sync="dialogVisible"
                    width="30%">
                <el-tag>楼栋名称</el-tag>
                <el-input
                        size="small"
                        style="width: 200px;margin-left: 8px"
                        v-model="updateBuilding.name">
                </el-input>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateSubmit" >确 定</el-button>
  </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SetBuild",
        data(){
            return{
                building:{
                    name:''
                },
                buildings:[],
                multipleSelection:[],
                dialogVisible:false,
                updateBuilding:{
                    name:'',
                    id:null
                }
            }
        },
        mounted() {
            this.initBuilding();
        },
        methods:{
            updateSubmit(){
                if(this.updateBuilding.name){
                    this.putRequest("/setting/building/",this.updateBuilding).then(resp=>{
                        if(resp){
                            this.dialogVisible=false;
                            this.initBuilding();
                        }
                    })
                }else{
                    this.$message.error("楼栋名称不能为空")
                }
            },
            initBuilding(){
                this.getRequest("/setting/building/").then(resp=>{
                    if(resp){
                        this.buildings=resp;
                    }
                })
            },
            addBuilding(){
                if(this.building.name){
                    this.postRequest("/setting/building/", this.building).then(resp => {
                        if (resp) {
                            this.building.name = '';
                            this.initBuilding();
                        }
                    })
                }else {
                    this.$message.error("楼栋名称不能为空")
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleEdit(row){
                this.updateBuilding.id=row.id;
                this.updateBuilding.name=row.name;
                this.dialogVisible=true;

            },
            handleDelete(row){
                this.$confirm('此操作将永久删除[ '+row.name+' ]该楼栋, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    ids += 'ids=' + row.id;
                    this.deleteRequest('/setting/building/' + ids).then(resp => {
                        if (resp) {
                            this.initBuilding();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            deleteMany(){
                this.$confirm('此操作将永久删除[ '+this.multipleSelection.length+' ]条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item=>{
                        ids += 'ids=' + item.id+'&';
                    })
                    this.deleteRequest('/setting/building/' + ids).then(resp => {
                        if (resp) {
                            this.initBuilding();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style>
    .addBuilding{
        width: 300px;
        margin-top: 5px;
    }
    .buildTable{
        margin-top: 8px;
        width: 80%;
    }
    .buildDelete{
        margin-top: 8px;
    }
</style>