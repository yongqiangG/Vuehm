<template>
    <div>
        <div style="width: 70%">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>空调季节设置</span>
                    <el-button style="float: right" type="primary" size="small" icon="el-icon-success">保存设置</el-button>
                </div>
                <div>
                    <el-row>
                        <el-col :span="12">
                            <el-switch
                                    style="display: block"
                                    v-model="season.workMode"
                                    active-color="#13ce66"
                                    inactive-color="#537EFF"
                                    active-text="夏季(制冷)"
                                    inactive-text="冬季(制热)">
                            </el-switch>
                        </el-col>
                        <el-col :span="12">
                            <el-switch
                                    style="display: block"
                                    v-model="season.valveMode"
                                    active-color="#13ce66"
                                    inactive-color="#537EFF"
                                    active-text="单阀"
                                    inactive-text="双阀">
                            </el-switch>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 10px">
                        <el-col :span="12">
                            <el-switch
                                    style="display: block"
                                    v-model="season.electricHeating"
                                    active-color="#13ce66"
                                    inactive-color="#537EFF"
                                    active-text="电加热开"
                                    inactive-text="电加热关">
                            </el-switch>
                        </el-col>
                        <el-col :span="12">
                            <el-switch
                                    style="display: block"
                                    v-model="season.infraredControl"
                                    active-color="#13ce66"
                                    inactive-color="#537EFF"
                                    active-text="红外控制开"
                                    inactive-text="红外控制关">
                            </el-switch>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </div>
        <div>
            <div>
                <div>
                    <el-button type="primary" @click="multiSend" :disabled="multipleSelection.length==0" style="margin-top: 5px">批量发送
                    </el-button>
                </div>
            </div>
            <div>
                <el-table
                        :data="roomTypes"
                        @selection-change="handleSelectionChange"
                        border
                        stripe
                        style="margin-top: 5px;width: 50%;"
                >
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
                            label="房间类型"
                            width="100">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="success"
                                    @click="handleSend(scope.row)">发送
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--根据房型显示房间-->
            <el-dialog
                    title="发送空调季节"
                    :visible.sync="dialogVisible"
                    width="50%"
            >
                <div style="display: flex;justify-content: space-between">
                    <div>
                        <el-tag>当前房型</el-tag>
                        <span style="margin-left: 8px;font-weight: 700">{{roomTypeName}}</span>
                    </div>
                    <div>
                        <el-button type="primary" :disabled="multipleSelection1.length==0">发送空调季节</el-button>
                    </div>
                </div>
                <div>
                    <el-table
                            :data="rooms"
                            @selection-change="handleSelectionChange1"
                            border
                            stripe
                            v-loading="loading"
                    >
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
                                prop="roomNo"
                                label="房号"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="roomType.name"
                                label="房型"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="building.name"
                                label="楼栋"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="txFloor.name"
                                label="楼层"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="ip"
                                label="IP"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="port"
                                label="端口"
                                width="60">
                        </el-table-column>
                        <el-table-column
                                prop="airSettingSendStatus"
                                label="发送状态"
                        >
                        </el-table-column>
                    </el-table>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AirSeason",
        data() {
            return {
                season: {
                    workMode: false,
                    valveMode: false,
                    electricHeating: false,
                    infraredControl: false,
                },
                multipleSelection: [],
                multipleSelection1: [],
                dialogVisible: false,
                loading: false,
                rooms: [],
                roomTypes: [],
                roomTypeName: ''
            }
        },
        mounted() {
            this.initRoomType()
        },
        methods: {
            //所有房型
            initRoomType() {
                this.getRequest('/air/count/').then(resp => {
                    this.roomTypes = resp;
                })
            },
            //批量发送
            multiSend() {

            },
            handleSend(row) {
                this.loading = true
                this.rooms = []
                this.getRequest("/setting/room/rid/" + row.id).then(resp => {
                    if (resp) {
                        this.rooms = resp;
                        this.loading = false
                    }
                })
                this.dialogVisible = true;
                this.roomTypeName = row.name;
            },
            //多选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //多选
            handleSelectionChange1(val) {
                this.multipleSelection1 = val;
            },
        }
    }
</script>

<style>
</style>