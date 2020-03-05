<template>
    <div>
        <div>
            <el-select v-model="roomType.isWireless" placeholder="请选择终端类型" style="width: 200px">
                <el-option
                        v-for="item in machineType"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-input
                    placeholder="新增房型"
                    prefix-icon="el-icon-plus"
                    style="width: 200px;margin-left: 10px"
                    v-model="roomType.name">
            </el-input>
            <el-button type="primary" prefix-icon="el-icon-plus" style="margin-left: 10px" @click="addRoomType">新增房型
            </el-button>
        </div>
        <div>
            <el-table
                    :data="roomTypes"
                    @selection-change="handleSelectionChange"
                    border
                    stripe
                    class="roomTypeTable">
                <el-table-column
                        type="selection"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="ID"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="房型名称"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="isWireless"
                        label="终端类型"
                        width="90">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.isWireless">无线终端</el-tag>
                        <el-tag type="success" v-else>有线终端</el-tag>
                    </template>
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
                        <el-button
                                size="mini"
                                type="primary"
                                @click="moduleSetting(scope.row)">模块设置
                        </el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="sendLogic(scope.row)">发送逻辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="imLogic(scope.row)">导入逻辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="exLogic(scope.row)">上传逻辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="imCloudLogic(scope.row)">导入云端逻辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" size="small" class="deleteBtn" @click="deleteMany"
                       :disabled="multipleSelection.length==0">批量删除
            </el-button>
        </div>
        <div>
            <el-dialog
                    title="修改房型"
                    :visible.sync="dialogVisible"
                    width="30%">
                <table>
                    <tr>
                        <td><el-tag>房型名称</el-tag></td>
                        <td><el-select v-model="updateRoomType.isWireless" placeholder="请选择终端类型" style="width: 200px;margin-left: 8px">
                            <el-option
                                    v-for="item in machineType"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select></td>
                    </tr>
                    <tr>
                        <td><el-tag>房型名称</el-tag></td>
                        <td><el-input
                                size="small"
                                style="width: 200px;margin-left: 8px"
                                v-model="updateRoomType.name">
                        </el-input></td>
                    </tr>

                </table>




                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateSubmit">确 定</el-button>
  </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SetRoomType",
        data() {
            return {
                roomType: {
                    isWireless: null,
                    name: ''
                },
                machineType: [{id: 1, name: '无线终端'}, {id: 0, name: '有线终端'}],
                roomTypes:[],
                multipleSelection: [],
                dialogVisible:false,
                updateRoomType:{
                    isWireless:null,
                    name:'',
                    id:null
                }
            }
        },
        mounted() {
            this.initRoomType();
        },
        methods: {
            imCloudLogic(row){

            },
            exLogic(){

            },
            imLogic(row){

            },
            sendLogic(row){

            },
            moduleSetting(row){

            },
            initAdd() {
                this.roomType = {
                    isWireless: null,
                    name: ''
                }
            },
            initRoomType() {
                this.getRequest('/setting/roomtype/').then(resp=>{
                    this.roomTypes=resp;
                })
            },
            addRoomType() {
                if (this.roomType.name&&typeof(this.roomType.isWireless)=="number") {
                    this.postRequest('/setting/roomtype/', this.roomType).then(resp => {
                        if (resp) {
                            this.initRoomType();
                            this.initAdd();
                        }
                    })
                } else {
                    this.$message.error("提交参数不能为空");
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            deleteMany(){
                this.$confirm('此操作将永久删除[ ' + this.multipleSelection.length + ' ]条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    })
                    this.deleteRequest('/setting/roomtype/' + ids).then(resp => {
                        if (resp) {
                            this.initRoomType();
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
                this.updateRoomType.id=row.id;
                this.updateRoomType.name=row.name;
                this.updateRoomType.isWireless=row.isWireless;

            },
            handleDelete(row){
                this.$confirm('此操作将永久删除[ ' + row.name + ' ]该房型, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    ids += 'ids=' + row.id;
                    this.deleteRequest('/setting/roomtype/' + ids).then(resp => {
                        if (resp) {
                            this.initRoomType();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            updateSubmit(){
                if (this.updateRoomType.name && this.updateRoomType.isWireless && this.updateRoomType.id) {
                    this.putRequest('/setting/setting/', this.updateRoomType).then(resp => {
                        if (resp) {
                            this.initRoomType();
                            this.dialogVisible=false
                        }
                    })
                } else {
                    this.$message.error('提交参数不能为空');
                }
            }
        }
    }
</script>

<style>
    .roomTypeTable{
        margin-top: 8px;
        width: 100%;
    }
    .deleteBtn{
        margin-top: 8px;
    }
</style>