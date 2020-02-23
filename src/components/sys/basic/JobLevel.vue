<template>
    <div>
        <div>
            <el-input
                    placeholder="新增职称"
                    prefix-icon="el-icon-plus"
                    style="width: 200px"
                    v-model="jobLevelInput.name">
            </el-input>
            <el-select v-model="jobLevelInput.titleLevel" placeholder="请选择职称等级" style="width: 200px;margin-left: 10px">
                <el-option
                        v-for="item in jobLevels"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
            <el-button type="primary" prefix-icon="el-icon-plus" style="margin-left: 10px" @click="addJobLevel">添加
            </el-button>
        </div>
        <div>
            <el-table
                    :data="jobLevelData"
                    @selection-change="handleSelectionChange"
                    border
                    stripe
                    class="jobTable">
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
                        label="职称名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="titleLevel"
                        label="职称等级"
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
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
                        <el-tag type="danger" v-else>未启用</el-tag>
                    </template>
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
            <el-button type="danger" size="small" class="jobDelete" @click="deleteMany"
                       :disabled="multipleSelection.length==0">批量删除
            </el-button>
        </div>
        <div>
            <el-dialog
                    title="修改职称信息"
                    :visible.sync="dialogVisible"
                    width="30%">
                <table>
                    <tr>
                        <td>
                            <el-tag>职称名称</el-tag>
                        </td>
                        <td>
                            <el-input
                                    size="small"
                                    style="width: 200px;margin-left: 8px"
                                    v-model="updateJobLevel.name">
                            </el-input>

                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-tag>职称等级</el-tag>

                        </td>
                        <td>
                            <el-select v-model="updateJobLevel.titleLevel" placeholder="请选择职称等级"
                                       style="width: 200px;margin-left: 10px">
                                <el-option
                                        v-for="item in jobLevels"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>

                            <el-tag>是否启用</el-tag>
                        </td>
                        <td>
                            <el-switch
                                    v-model="updateJobLevel.enabled"
                                    active-text="已启用"
                                    inactive-text="未启用">
                            </el-switch>

                        </td>
                    </tr>
                </table>

                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateJobSubmit">确 定</el-button>
  </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "JobLevel",
        data() {
            return {
                jobLevelInput: {
                    name: '',
                    titleLevel: ''
                },
                jobLevels: ['正高级', '副高级', '中级', '初级', '员级'],
                selectedJobLevel: '',
                jobLevelData: [],
                multipleSelection: [],
                dialogVisible: false,
                updateJobLevel: {
                    name: '',
                    titleLevel: '',
                    enabled: false
                }
            }
        },
        mounted() {
            this.initJobLevel()
        },
        methods: {
            addJobLevel() {
                if (this.jobLevelInput.name && this.jobLevelInput.titleLevel) {
                    this.postRequest('/system/basic/job/', this.jobLevelInput).then(resp => {
                        if (resp) {
                            this.initJobLevel();
                        }
                    })
                } else {
                    this.$message.error('职称名称和职称等级不能为空');
                }
            },
            initJobLevel() {
                this.jobLevelInput.name = ''
                this.jobLevelInput.titleLevel = ''
                this.getRequest('/system/basic/job/').then(resp => {
                    if (resp) {
                        this.jobLevelData = resp;
                    }
                })
            },
            handleEdit(row) {
                this.dialogVisible = true
                Object.assign(this.updateJobLevel, row);
            },
            handleDelete(row) {
                this.$confirm('此操作将永久删除[' + row.name + ']该职称, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    ids += 'ids=' + row.id;
                    this.deleteRequest('/system/basic/job/' + ids).then(resp => {
                        if (resp) {
                            this.initJobLevel();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            deleteMany() {
                this.$confirm('此操作将永久删除[' + this.multipleSelection.length + ']条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&'
                    })
                    this.deleteRequest('/system/basic/job/' + ids).then(resp => {
                        if (resp) {
                            this.initJobLevel();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            updateJobSubmit() {
                this.putRequest('/system/basic/job/',this.updateJobLevel).then(resp=>{
                    if(resp){
                        this.dialogVisible=false;
                        this.initJobLevel();
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .jobTable {
        margin-top: 8px;
        width: 70%;
    }

    .jobDelete {
        margin-top: 8px;
    }
</style>