<template>
    <div>
        <div>
            <el-input
                    class="posAddInput"
                    size="small"
                    placeholder="请输入新增职位"
                    prefix-icon="el-icon-plus"
                    v-model="pos.name">
            </el-input>
            <el-button type="primary" size="small" style="margin-left: 8px" @click="addPos">新增职位</el-button>
        </div>
        <div>
            <el-table
                    :data="positions"
                    @selection-change="handleSelectionChange"
                    border
                    stripe
                    class="posTable">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="ID"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职位"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="enabled"
                        label="是否禁用"
                        width="100">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" size="small" class="posDelete" @click="deleteMany" :disabled="multipleSelection.length==0">批量删除</el-button>
        </div>
        <div>
            <el-dialog
                    title="修改职位信息"
                    :visible.sync="dialogVisible"
                    width="30%">
                <el-tag>职位</el-tag>
                <el-input
                        size="small"
                        style="width: 200px;margin-left: 8px"
                        v-model="updatePosName.name">
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
        name: "PosMana",
        data() {
            return {
                pos: {
                    name: ''
                },
                positions: [],
                dialogVisible:false,
                updatePosName:{
                    id:null,
                    name:''
                },
                multipleSelection:[]
            }
        },
        mounted() {
            this.initPosTable();
        },
        methods: {
            initPosTable() {
                this.getRequest('/system/basic/pos/').then(resp => {
                    this.positions = resp;
                })
            },
            addPos() {
                if (this.pos.name) {
                    this.postRequest('/system/basic/pos/', this.pos).then(resp => {
                        if (resp) {
                            this.initPosTable();
                            this.pos.name = '';
                        }
                    })
                }
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除['+row.name+']该职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    ids += 'ids=' + row.id;
                    this.deleteRequest('/system/basic/pos/' + ids).then(resp => {
                        if (resp) {
                            this.initPosTable();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleEdit(index, row) {
                this.updatePosName.name=row.name;
                this.updatePosName.id=row.id;
                this.dialogVisible=true;

            },
            updateSubmit(){
                this.putRequest('/system/basic/pos/',this.updatePosName).then(resp=>{
                    if(resp){
                        this.dialogVisible=false;
                        this.initPosTable();
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            deleteMany(){
                this.$confirm('此操作将永久删除['+this.multipleSelection.length+']条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item=>{
                        ids += 'ids=' + item.id+'&';
                    })
                    this.deleteRequest('/system/basic/pos/' + ids).then(resp => {
                        if (resp) {
                            this.initPosTable();
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

<style scoped>
    .posAddInput {
        width: 300px;
        margin-top: 8px;
    }

    .posTable {
        margin-top: 8px;
        width: 70%;
    }

    .posDelete {
        margin-top: 8px;
    }
</style>