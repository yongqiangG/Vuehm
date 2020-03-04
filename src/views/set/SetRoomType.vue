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
                                @click="moduleSetting(scope.row)">发送逻辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="moduleSetting(scope.row)">导入逻辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="moduleSetting(scope.row)">上传逻辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="moduleSetting(scope.row)">导入云端逻辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" size="small" class="deleteBtn" @click="deleteMany"
                       :disabled="multipleSelection.length==0">批量删除
            </el-button>
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
                multipleSelection: []
            }
        },
        mounted() {
            this.initRoomType();
        },
        methods: {
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
                console.log(this.roomType.isWireless)
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

            },
            handleEdit(row){

            },
            handleDelete(row){

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