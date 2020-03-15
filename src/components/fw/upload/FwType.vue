<template>
    <div>
        <div>
            <el-input
                    @keydown.native.enter="addType"
                    style="width: 200px;"
                    size="small"
                    placeholder="请输入新增固件类型名称"
                    prefix-icon="el-icon-plus"
                    v-model="fwType.name">
            </el-input>
            <el-button type="primary" size="small" style="margin-left: 8px" @click="addType">新增固件类型</el-button>
        </div>
        <div>
            <el-table
                    :data="fwTypes"
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
                        label="固件类型"
                        width="250">
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
                        v-model="updateFwType.name">
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
        name: "FwType",
        data(){
            return{
                fwType:{
                    name:''
                },
                fwTypes:[],
                multipleSelection:[],
                dialogVisible:false,
                updateFwType:{
                    name:'',
                    id:null
                }
            }
        },
        mounted() {
            this.initFwTypes();
        },
        methods:{
            initUpdate(){
                this.updateFwType.id=null
                this.updateFwType.name=''
            },
            updateSubmit(){
                this.putRequest('/fw/upload/fwtype/',this.updateFwType).then(resp=>{
                    if(resp){
                        this.dialogVisible=false
                        this.initFwTypes();
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
                    this.deleteRequest('/fw/upload/fwtype/' + ids).then(resp => {
                        if (resp) {
                            this.initFwTypes();
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
                this.$confirm('此操作将永久删除[ '+row.name+' ]该固件类型, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    ids += 'ids=' + row.id;
                    this.deleteRequest('/fw/upload/fwtype/' + ids).then(resp => {
                        if (resp) {
                            this.initFwTypes();
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
                this.updateFwType.id=row.id
                this.updateFwType.name=row.name
            },
            initFwType(){
                this.fwType.name='';
            },
            initFwTypes(){
                this.getRequest('/fw/upload/fwtype/').then(resp=>{
                    if(resp){
                        this.fwTypes=resp;
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            addType(){
                if(this.fwType.name){
                    this.postRequest('/fw/upload/fwtype/',this.fwType).then(resp=>{
                        if(resp){
                            this.initFwTypes();
                            this.initFwType();
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>