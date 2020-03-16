<template>
    <div>
        <div>
            <el-input
                    @keydown.native.enter="addModule"
                    style="width: 300px;"
                    size="small"
                    placeholder="请输入新增功能类型名称"
                    prefix-icon="el-icon-plus"
                    v-model="mType.name">
            </el-input>
            <el-button type="primary" size="small" style="margin-left: 8px" @click="addModule">新增功能类型</el-button>
        </div>
        <div>
            <el-table
                    :data="mTypes"
                    @selection-change="handleSelectionChange"
                    border
                    stripe
                    style="width:80%;margin-top: 8px">
                <el-table-column
                        type="selection"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="ID"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="功能模块名称"
                        width="350">
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
            <el-button type="danger" size="small" style="margin-top: 8px" @click="deleteMany" :disabled="multipleSelection.length==0">批量删除</el-button>
        </div>
        <div>
            <el-dialog
                    title="修改固件类型"
                    :visible.sync="dialogVisible"
                    width="30%">
                <el-tag>固件类型</el-tag>
                <el-input
                        @keydown.native.enter="updateSubmit"
                        size="small"
                        style="width: 200px;margin-left: 8px"
                        v-model="updateMType.name">
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
        name: "ModuleType",
        data(){
            return{
                mType:{
                    name:''
                },
                mTypes:[],
                multipleSelection:[],
                dialogVisible:false,
                updateMType:{
                    name:'',
                    id:null
                }
            }
        },
        mounted() {
            this.initMTypes();
        },
        methods:{
            initUpdate(){
                this.updateMType.id=null
                this.updateMType.name=''
            },
            updateSubmit(){
                this.putRequest('/fw/upload/mtype/',this.updateMType).then(resp=>{
                    if(resp){
                        this.dialogVisible=false
                        this.initMTypes();
                        this.initUpdate();
                    }
                })
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
                    this.deleteRequest('/fw/upload/mtype/' + ids).then(resp => {
                        if (resp) {
                            this.initMTypes();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleDelete(row){
                this.$confirm('此操作将永久删除[ '+row.name+' ]该功能模块类型, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    ids += 'ids=' + row.id;
                    this.deleteRequest('/fw/upload/mtype/' + ids).then(resp => {
                        if (resp) {
                            this.initMTypes();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleEdit(row){
                this.dialogVisible=true;
                this.updateMType.id=row.id
                this.updateMType.name=row.name
            },
            initMType(){
                this.mType.name='';
            },
            initMTypes(){
                this.getRequest('/fw/upload/mtype/').then(resp=>{
                    if(resp){
                        this.mTypes=resp;
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            addModule(){
                if(this.mType.name){
                    this.postRequest('/fw/upload/mtype/',this.mType).then(resp=>{
                        if(resp){
                            this.initMTypes();
                            this.initMType();
                        }
                    })
                }
            }
        }
    }
</script>

<style>

</style>