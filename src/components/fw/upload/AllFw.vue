<template>
    <div>
        <div style="display: flex;justify-content: space-between">
            <div>
                <el-select v-model="keyWord" placeholder="请选择">
                    <el-option
                            v-for="item in fwTypes"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-button type="primary" @click="showDia">上传新固件</el-button>
            </div>
        </div>
        <div>
            <el-table
                    :data="fws"
                    @selection-change="handleSelectionChange"
                    border
                    stripe
                    style="margin-top: 8px;">
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
                        label="文件名称"
                        width="150">
                    <template slot-scope="scope">
                        <div v-if="(scope.row.name&&scope.row.name.length<10)||scope.row.name==null">
                            {{scope.row.name}}
                        </div>
                        <div v-else>
                            <span>{{scope.row.name.slice(0,10)}}</span>
                            <el-popover
                                    placement="right"
                                    title="文件名"
                                    width="200"
                                    trigger="hover"
                            >
                                <div>{{scope.row.name}}</div>
                                <el-button slot="reference" icon="el-icon-more" type="text"
                                           :disabled="moreDisabled"></el-button>
                            </el-popover>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="固件类型"
                        width="100">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.fwType.name}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="支持功能模块"
                        width="200">
                    <template slot-scope="scope">
                        <div v-if="scope.row.moduleTypes<3">
                            <el-tag v-for="(type,index) in scope.row.moduleTypes"
                                    :key="index" style="margin-left: 3px;" type="success">{{type.name}}
                            </el-tag>
                            <el-popover
                                    placement="right"
                                    title="支持功能列表"
                                    @show="showPop(scope.row)"
                                    @hide="hidePop(scope.row)"
                                    width="200"
                                    trigger="click">
                                <el-select v-model="selectedModuleType" multiple placeholder="请选择">
                                    <el-option
                                            v-for="(m,indexj) in allModuleType"
                                            :key="indexj"
                                            :label="m.name"
                                            :value="m.id">
                                    </el-option>
                                </el-select>
                                <el-button slot="reference" icon="el-icon-more" type="text"
                                           :disabled="moreDisabled"></el-button>
                            </el-popover>
                        </div>
                        <div v-else>
                            <el-tag v-for="(type,index) in scope.row.moduleTypes.slice(0,2)"
                                    :key="index" style="margin-left: 3px;" type="success">{{type.name}}
                            </el-tag>
                            <el-popover
                                    placement="right"
                                    title="支持功能列表"
                                    @show="showPop(scope.row)"
                                    @hide="hidePop(scope.row)"
                                    width="200"
                                    trigger="click">
                                <el-select v-model="selectedModuleType" multiple placeholder="请选择">
                                    <el-option
                                            v-for="(m,indexj) in allModuleType"
                                            :key="indexj"
                                            :label="m.name"
                                            :value="m.id">
                                    </el-option>
                                </el-select>
                                <el-button slot="reference" icon="el-icon-more" type="text"
                                           :disabled="moreDisabled"></el-button>
                            </el-popover>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="备注信息"
                        width="150">
                    <template slot-scope="scope">
                        <div v-if="(scope.row.remark&&scope.row.remark.length<8)||scope.row.remark==null">
                            {{scope.row.remark}}
                        </div>
                        <div v-else>
                            <span>{{scope.row.remark.slice(0,8)}}</span>
                            <el-popover
                                    placement="right"
                                    title="备注"
                                    width="200"
                                    trigger="hover"
                            >
                                <div>{{scope.row.remark}}</div>
                                <el-button slot="reference" icon="el-icon-more" type="text"
                                           :disabled="moreDisabled"></el-button>
                            </el-popover>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间"
                        width="90">
                </el-table-column>
                <el-table-column label="操作" fixed="right">
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
            <el-button type="danger" size="small" style="margin-top: 8px" @click="deleteMany"
                       :disabled="multipleSelection.length==0">批量删除
            </el-button>
        </div>
        <el-dialog
                title="上传新固件"
                :visible.sync="dialogVisible"
                width="50%"
        >
            <el-row>
                <el-col :span="6">选择固件类型</el-col>
                <el-col :span="18">
                    <el-select v-model="addFw" placeholder="请选择固件类型" @change="changeAddFw">
                        <el-option
                                v-for="item in fwTypes"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">选择支持功能</el-col>
                <el-col :span="18">
                    <el-popover
                            placement="right"
                            title="支持功能列表"
                            width="200"
                            trigger="click">
                        <el-select v-model="addModuleType" multiple placeholder="请选择">
                            <el-option
                                    v-for="(m,indexk) in allModuleType"
                                    :key="indexk"
                                    :label="m.name"
                                    :value="m.id">
                            </el-option>
                        </el-select>
                        <el-button slot="reference" icon="el-icon-more" type="text"
                                   :disabled="moreDisabled"></el-button>
                    </el-popover>
                </el-col>
            </el-row>
            <el-col :span="6" v-model="tips" style="color: red">
                {{tips}}
            </el-col>
            <el-col :span="6">
                <el-upload
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :on-success="onSuccess"
                        :on-error="onError"
                        :disabled="importDataDisabled"
                        style="display: inline-flex;margin-right: 8px"
                        :action="addUrl">
                    <el-button :disabled="importDataDisabled" type="success" :icon="importDataBtnIcon">
                        {{importDataBtnText}}
                    </el-button>
                </el-upload>
            </el-col>

            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSubmit">确 定</el-button>
  </span>
        </el-dialog>
        <el-dialog
                title="更新固件信息"
                :visible.sync="dialogVisible1"
                width="60%"
        >
            <el-row>
                <el-col :span="6">
                    <el-tag>文件名称:</el-tag>
                </el-col>
                <el-col :span="18">
                    <input type="textarea"
                           autosize v-model="updateFwInfo.name" disabled style="width: 300px"></input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-tag>固件类型:</el-tag>
                </el-col>
                <el-col :span="18">
                    <el-select v-model="updateFwInfo.fwTypeId" placeholder="请选择固件类型">
                        <el-option
                                v-for="item in fwTypes"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-tag>备注信息:</el-tag>
                </el-col>
                <el-col :span="18">
                    <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="updateFwInfo.remark">
                    </el-input>
                </el-col>
            </el-row>

<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="updateSubmit">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "AllFw",
        data() {
            return {
                fwTypes: [],
                fws: [],
                keyWord: null,
                importDataDisabled: true,
                importDataBtnText: '上传固件',
                dialogVisible: false,
                dialogVisible1:false,
                importDataBtnIcon: '',
                multipleSelection: '',
                selectedModuleType: [],
                addModuleType: [],
                allModuleType: [],
                moreDisabled: false,
                addFw: null,
                addUrl: '',
                tips: '请先选择固件类型',
                backId: null,
                updateFwInfo:{
                    id:null,
                    name:'',
                    fwTypeId:null,
                    remark:''
                }
            }
        },
        mounted() {
            this.initFwTypes()
            this.initModuleType()
            this.initFws()
        },
        methods: {
            updateSubmit(){
                if(this.updateFwInfo.id&&this.updateFwInfo.fwTypeId){
                    this.putRequest().then(resp=>{
                        if(resp){
                            this.dialogVisible1=false;
                            this.initFws();
                        }
                    })
                }
            },
            initAddSubmit() {
                this.addfw = null
                this.addModuleType = null
            },
            addSubmit() {
                if (this.backId) {
                    let url = '/fw/upload/fmodule/?fid=' + this.backId;
                    this.addModuleType.forEach(sm => {
                        url += '&mids=' + sm;
                    });
                    this.putRequest(url).then(resp => {
                        if (resp) {
                            this.initFws();
                            this.dialogVisible = false;
                            this.initAddSubmit()
                        }
                    });
                } else {
                    this.$message.info("请选择固件类型")
                }
            },
            changeAddFw() {
                if (this.addFw) {
                    this.importDataDisabled = false
                    this.addUrl = '/fw/upload/fwinfo/up/' + this.addFw;
                }
            },
            showDia() {
                this.dialogVisible = true
            },
            initModuleType() {
                this.getRequest('fw/upload/mtype/').then(resp => {
                        if (resp) {
                            this.allModuleType = resp;
                        }
                    }
                )
            },
            showPop(row) {
                this.moreDisabled = true
                let selected = row.moduleTypes;
                this.selectedModuleType = [];
                selected.forEach(m => {
                    this.selectedModuleType.push(m.id)
                })
            },
            hidePop(row) {
                this.moreDisabled = false
                let module = [];
                Object.assign(module, row.moduleTypes);
                let flag = false;
                if (module.length != this.selectedModuleType.length) {
                    flag = true;
                } else {
                    for (let i = 0; i < module.length; i++) {
                        let m = module[i];
                        for (let j = 0; j < this.selectedModuleType.length; j++) {
                            let sm = this.selectedModuleType[j];
                            if (m.id == sm) {
                                module.splice(i, 1);
                                i--;
                                break;
                            }
                        }
                    }
                    if (module.length != 0) {
                        flag = true;
                    }
                }
                if (flag) {
                    let url = '/fw/upload/fmodule/?fid=' + row.id;
                    this.selectedModuleType.forEach(sm => {
                        url += '&mids=' + sm;
                    });
                    this.putRequest(url).then(resp => {
                        if (resp) {
                            this.initFws();
                        }
                    });
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            onError(err, file, fileList) {
                this.importDataBtnText = '导入数据';
                this.importDataBtnIcon = 'el-icon-upload2';
                this.importDataDisabled = false;
            },
            onSuccess(response, file, fileList) {
                this.importDataBtnText = '导入数据';
                this.importDataBtnIcon = 'el-icon-upload2';
                this.importDataDisabled = false;
                this.$message.success(response.msg)
                this.backId = response.obj
            },
            beforeUpload() {
                this.importDataBtnText = '正在导入';
                this.importDataBtnIcon = 'el-icon-loading';
                this.importDataDisabled = true;
            },
            initFwTypes() {
                this.getRequest('/fw/upload/fwtype/').then(resp => {
                    if (resp) {
                        this.fwTypes = resp
                    }
                })
            },
            initFws() {
                this.getRequest('/fw/upload/fwinfo/').then(resp => {
                    if (resp) {
                        this.fws = resp.obj.data;
                    }
                })
            },
            handleDelete(row) {
                this.$confirm('此操作将永久删除[ ' + row.name + ' ]该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    ids += 'ids=' + row.id;
                    this.deleteRequest('/fw/upload/fwinfo/' + ids).then(resp => {
                        if (resp) {
                            this.initFws();
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
                this.updateFwInfo.name=row.name
                this.updateFwInfo.remark=row.remark
                this.updateFwInfo.fwTypeId=row.fwTypeId
                this.updateFwInfo.id=row.id
                this.dialogVisible1 = true
            },
            deleteMany() {
                this.$confirm('此操作将永久删除[ ' + this.multipleSelection.length + ' ]条记录及固件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    })
                    this.deleteRequest('/fw/upload/fwinfo/' + ids).then(resp => {
                        if (resp) {
                            this.initFws();
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
.el-row{
    margin-top: 8px;
}
</style>