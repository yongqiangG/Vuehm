<template>
    <div>
        <div>
            <el-select v-model="floor.buildingId" placeholder="请选择楼栋" style="width: 200px">
                <el-option
                        v-for="item in buildings"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-input
                    placeholder="新增楼层"
                    prefix-icon="el-icon-plus"
                    style="width: 200px;margin-left: 10px"
                    v-model="floor.name">
            </el-input>
            <el-button type="primary" prefix-icon="el-icon-plus" style="margin-left: 10px" @click="addFloor">新增楼层
            </el-button>
        </div>
        <div>
            <el-table
                    :data="floors"
                    @selection-change="handleSelectionChange"
                    border
                    stripe
                    class="floorTable">
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
                        label="楼层名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="building.name"
                        label="所属楼栋"
                        width="150">
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
            <el-button type="danger" size="small" class="buildDelete" @click="deleteMany"
                       :disabled="multipleSelection.length==0">批量删除
            </el-button>
        </div>
        <div>
            <el-dialog
                    title="修改楼栋名称"
                    :visible.sync="dialogVisible"
                    width="30%">
                <table>
                    <tr>
                        <td><el-tag>楼栋名称</el-tag></td>
                        <td><el-select v-model="updateFloor.buildingId" placeholder="请选择楼栋" style="width: 200px;margin-left: 8px">
                            <el-option
                                    v-for="item in buildings"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select></td>
                    </tr>
                    <tr>
                        <td><el-tag>楼层名称</el-tag></td>
                        <td><el-input
                                size="small"
                                style="width: 200px;margin-left: 8px"
                                v-model="updateFloor.name">
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
        name: "SetFloor",
        data() {
            return {
                floor: {
                    buildingId: null,
                    name: ''
                },
                updateFloor: {
                    id: null,
                    name: '',
                    buildingId: null
                },
                buildings: [],
                floors: [],
                multipleSelection: [],
                dialogVisible: false
            }
        },
        mounted() {
            this.initBuildings();
            this.initFloors();
        },
        methods: {
            initAdd() {
                this.floor = {
                    buildingId: null,
                    name: ''
                }
            },
            addFloor() {
                if (this.floor.name && this.floor.buildingId) {
                    this.postRequest("/setting/floor/", this.floor).then(resp => {
                        if (resp) {
                            this.initFloors();
                            this.initAdd();
                        }
                    })
                } else {
                    this.$message.error("提交参数不能为空");
                }
            },
            initFloors() {
                this.getRequest("/setting/floor/").then(resp => {
                    this.floors = resp;
                })
            },
            initBuildings() {
                this.getRequest("/setting/building/").then(resp => {
                    this.buildings = resp;
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            deleteMany() {
                this.$confirm('此操作将永久删除[ ' + this.multipleSelection.length + ' ]条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    })
                    this.deleteRequest('/setting/floor/' + ids).then(resp => {
                        if (resp) {
                            this.initFloors();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleEdit(row) {
                this.updateFloor.id = row.id;
                this.updateFloor.name = row.name;
                this.updateFloor.buildingId = row.building.id
                this.dialogVisible = true;
            },
            handleDelete(row) {
                this.$confirm('此操作将永久删除[ ' + row.name + ' ]该楼层, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    ids += 'ids=' + row.id;
                    this.deleteRequest('/setting/floor/' + ids).then(resp => {
                        if (resp) {
                            this.initFloors();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            updateSubmit() {
                if (this.updateFloor.name && this.updateFloor.buildingId && this.updateFloor.id) {
                    this.putRequest('/setting/floor/', this.updateFloor).then(resp => {
                        if (resp) {
                            this.initFloors();
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
    .floorTable {
        margin-top: 8px;
        width: 70%;
    }
</style>