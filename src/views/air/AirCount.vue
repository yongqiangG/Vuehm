<template>
    <div>
        <div>
            <el-button type="primary" @click="multiSend" :disabled="multipleSelection.length==0">批量发送</el-button>
        </div>
        <div>
            <el-table
                    :data="roomTypes"
                    @selection-change="handleSelectionChange"
                    border
                    stripe
                    class="MainTable"
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
                <el-table-column
                        prop="airs[0].airName"
                        label="空调1"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="airs[1].airName"
                        label="空调2"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="airs[2].airName"
                        label="空调3"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="airs[3].airName"
                        label="空调4"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="airs[4].airName"
                        label="空调5"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="airs[5].airName"
                        label="空调6"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="airs[6].airName"
                        label="空调7"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="airs[7].airName"
                        label="空调8"
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
                                type="success"
                                @click="handleSend(scope.row)">发送
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-dialog
                    title="空调数量设置"
                    :visible.sync="dialogVisible"
                    width="40%">
                <table class="airsTable">
                    <el-checkbox-group v-model="checkList" @change="handleChange">
                        <tr>
                            <td>
                                <el-checkbox label="空调1"></el-checkbox>
                            </td>
                            <td>
                                <el-input v-model="airNames.air1" :disabled="checkList.indexOf('空调1')==-1"></el-input>
                            </td>
                            <td>
                                <el-checkbox label="空调2"></el-checkbox>
                            </td>
                            <td>
                                <el-input v-model="airNames.air2" :disabled="checkList.indexOf('空调2')==-1"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-checkbox label="空调3">空调3</el-checkbox>
                            </td>
                            <td>
                                <el-input v-model="airNames.air3" :disabled="checkList.indexOf('空调3')==-1"></el-input>
                            </td>
                            <td>
                                <el-checkbox label="空调4">空调4</el-checkbox>
                            </td>
                            <td>
                                <el-input v-model="airNames.air4" :disabled="checkList.indexOf('空调4')==-1"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-checkbox label="空调5">空调5</el-checkbox>
                            </td>
                            <td>
                                <el-input v-model="airNames.air5" :disabled="checkList.indexOf('空调5')==-1"></el-input>
                            </td>
                            <td>
                                <el-checkbox label="空调6">空调6</el-checkbox>
                            </td>
                            <td>
                                <el-input v-model="airNames.air6" :disabled="checkList.indexOf('空调6')==-1"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-checkbox label="空调7">空调7</el-checkbox>
                            </td>
                            <td>
                                <el-input v-model="airNames.air7" :disabled="checkList.indexOf('空调7')==-1"></el-input>
                            </td>
                            <td>
                                <el-checkbox label="空调8">空调8</el-checkbox>
                            </td>
                            <td>
                                <el-input v-model="airNames.air8" :disabled="checkList.indexOf('空调8')==-1"></el-input>
                            </td>
                        </tr>
                    </el-checkbox-group>
                </table>
                <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateSubmit">确 定</el-button>
          </span>
            </el-dialog>
        </div>
        <!--根据房型显示房间-->
        <el-dialog
                title="发送空调数量"
                :visible.sync="dialogVisible1"
                width="50%"
        >
            <div style="display: flex;justify-content: space-between">
                <div>
                    <el-tag>当前房型</el-tag>
                    <span style="margin-left: 8px;font-weight: 700">{{roomTypeName}}</span>
                </div>
                <div>
                    <el-button type="primary" :disabled="multipleSelection1.length==0">发送空调数量</el-button>
                </div>
            </div>
            <div>
                <el-table
                        :data="rooms"
                        @selection-change="handleSelectionChange1"
                        border
                        stripe
                        v-loading="loading"
                        class="MainTable"
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
</template>

<script>
    export default {
        name: "AirCount",
        data() {
            return {
                rooms: [],
                roomTypeName: '',
                roomTypeId: null,
                roomTypes: [],
                multipleSelection: [],
                multipleSelection1: [],
                dialogVisible: false,
                dialogVisible1: false,
                checked: false,
                checkList: [],
                loading:false,
                airNames: {
                    air1: '',
                    air2: '',
                    air3: '',
                    air4: '',
                    air5: '',
                    air6: '',
                    air7: '',
                    air8: '',
                },
                airs: [],
                submitAir: {
                    roomTypeId: null,
                    airNo: null,
                    airName: ''
                },
                submitAirs: [
                    {
                        roomTypeId: null,
                        airNo: null,
                        airName: ''
                    }, {
                        roomTypeId: null,
                        airNo: null,
                        airName: ''
                    }, {
                        roomTypeId: null,
                        airNo: null,
                        airName: ''
                    }, {
                        roomTypeId: null,
                        airNo: null,
                        airName: ''
                    }, {
                        roomTypeId: null,
                        airNo: null,
                        airName: ''
                    }, {
                        roomTypeId: null,
                        airNo: null,
                        airName: ''
                    }, {
                        roomTypeId: null,
                        airNo: null,
                        airName: ''
                    }, {
                        roomTypeId: null,
                        airNo: null,
                        airName: ''
                    }
                ]
            }
        },
        mounted() {
            this.initRoomType();
        },
        methods: {
            initSubmit() {
                this.submitAirs = [
                    {
                        roomTypeId: null,
                        airNo: null,
                        airName: ''
                    }, {
                        roomTypeId: null,
                        airNo: null,
                        airName: ''
                    }, {
                        roomTypeId: null,
                        airNo: null,
                        airName: ''
                    }, {
                        roomTypeId: null,
                        airNo: null,
                        airName: ''
                    }, {
                        roomTypeId: null,
                        airNo: null,
                        airName: ''
                    }, {
                        roomTypeId: null,
                        airNo: null,
                        airName: ''
                    }, {
                        roomTypeId: null,
                        airNo: null,
                        airName: ''
                    }, {
                        roomTypeId: null,
                        airNo: null,
                        airName: ''
                    }
                ]
            },
            handleChange(value) {
                console.log('value:' + value)
                console.log(this.checkList)
                this.initSubmit();
            },
            initRoomType() {
                this.getRequest('/air/count/').then(resp => {
                    this.roomTypes = resp;
                })
            },
            /*批量发送空调数量*/
            multiSend() {

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSelectionChange1(val) {
                this.multipleSelection1 = val;
            },
            handleEdit(row) {
                this.checkList = []
                this.airNames = {
                    air1: '',
                    air2: '',
                    air3: '',
                    air4: '',
                    air5: '',
                    air6: '',
                    air7: '',
                    air8: '',
                }
                this.dialogVisible = true;
                this.roomTypeId = row.id;
                for (let i = 0; i < row.airs.length; i++) {
                    this.checkList = this.checkList.concat('空调' + row.airs[i].airNo);
                    this.airNames['air' + (i + 1)] = row.airs[i].airName
                }
            },
            handleSend(row) {
                this.loading=true
                this.rooms=[]
                this.getRequest("/setting/room/rid/" + row.id).then(resp => {
                    if (resp) {
                        this.rooms = resp;
                        this.loading=false
                    }
                })
                this.roomTypeName = row.name;
                this.dialogVisible1 = true;
            },
            updateSubmit() {
                for (let i = 0; i < this.checkList.length; i++) {
                    this.submitAirs[this.checkList[i].substr(this.checkList[i].length - 1, 1) - 1].airNo = this.checkList[i].substr(this.checkList[i].length - 1, 1);
                    this.submitAirs[this.checkList[i].substr(this.checkList[i].length - 1, 1) - 1].airName = this.airNames['air' + this.checkList[i].substr(this.checkList[i].length - 1, 1)];
                    this.submitAirs[this.checkList[i].substr(this.checkList[i].length - 1, 1) - 1].roomTypeId = this.roomTypeId;
                }
                //如果没有选择任何空调
                this.submitAirs[0].roomTypeId = this.roomTypeId;
                this.putRequest("/air/count/", this.submitAirs).then(resp => {
                    if (resp) {
                        this.dialogVisible = false;
                        this.initRoomType();
                    }
                })
            }
        }
    }
</script>

<style>
    .MainTable {
        margin-top: 5px;
    }
</style>