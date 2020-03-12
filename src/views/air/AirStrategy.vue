<template>
    <div>
        <div>
            <el-button type="primary" @click="addStrategy">新增策略</el-button>
        </div>
        <div>
            <el-table
                    :data="strategys"
                    border
                    stripe
                    @selection-change="handleSelectionChange"
                    style="margin-top: 8px;width: 50%"
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
                        label="节能策略名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="创建时间"
                        width="120">
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
                       :disabled="multipleSelection.length==0" style="margin-top: 8px">批量删除
            </el-button>
        </div>
        <div>

            <el-dialog
                    title="节能策略设置"
                    :visible.sync="dialogVisible"
                    width="80%">
                <div>
                    <el-form :model="strategy" :rules="rules" ref="strategyForm">
                        <el-row>
                            <el-col :span="7">
                                <el-form-item label="策略名称:" prop="name">
                                    <el-input style="width: 150px;" prefix-icon="el-icon-edit" v-model="strategy.name"
                                              placeholder="请输入节能策略名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="温度校正:" prop="tempCorrect">
                                    <el-input-number v-model="strategy.tempCorrect" :precision="1" :step="0.5" :max="5"
                                                     :min="-5"></el-input-number>&nbsp;℃
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="到达温度后风机运行策略:" prop="lowRunning">
                                    <el-select v-model="strategy.lowRunning" placeholder="请选择策略" size="mini"
                                               style="width: 200px;">
                                        <el-option
                                                v-for="item in lowRunnings"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-collapse v-model="activeNames" @change="handleChange" accordion style="width: 98%">
                            <el-collapse-item title="插卡策略" name="1" key="1">
                                <template slot="title">
                                    插卡策略
                                    <el-switch
                                            style="margin-left: 20px"
                                            v-model="enableds[0]"
                                            active-text="启用"
                                            inactive-text="禁用">
                                    </el-switch>
                                    <span style="margin-left: 20px;color: red">点击展开设置项</span>
                                </template>
                                <el-card class="box-card">
                                    <el-row>
                                        <el-col :span="8">
                                            <el-form-item label="空调开关:" prop="cardinSwitch">
                                                <el-switch
                                                        style="margin-left: 20px"
                                                        v-model="strategy.cardinSwitch"
                                                        active-text="开"
                                                        inactive-text="关">
                                                </el-switch>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="空调模式:" prop="cardinMode">
                                                <el-switch
                                                        style="margin-left: 20px"
                                                        v-model="strategy.cardinMode"
                                                        active-text="自动"
                                                        inactive-text="手动">
                                                </el-switch>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="风速:" prop="cardinspeed">
                                                <el-select v-model="strategy.cardinspeed" placeholder="请选择风速"
                                                           size="mini" style="width: 200px;">
                                                    <el-option
                                                            v-for="item in speeds"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="8">
                                            <el-form-item label="夏季插卡初始温度:" prop="cardinSummerTemp">
                                                <el-input-number v-model="strategy.cardinSummerTemp" :precision="1"
                                                                 :step="1" :max="31" :min="16"></el-input-number>&nbsp;℃
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="夏季插卡初始温度:" prop="cardinWinterTemp">
                                                <el-input-number v-model="strategy.cardinWinterTemp" :precision="1"
                                                                 :step="1" :max="31" :min="16"></el-input-number>&nbsp;℃
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="插卡时是否保持拔卡时的温度:" prop="keepCardoutTemp">
                                                <el-switch
                                                        v-model="strategy.keepCardoutTemp"
                                                        active-text="开"
                                                        inactive-text="关">
                                                </el-switch>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            <el-form-item label="睡眠模式:" prop="sleepModeSwitch">
                                                <el-switch
                                                        style="margin-left: 20px"
                                                        v-model="strategy.sleepModeSwitch"
                                                        active-text="开"
                                                        inactive-text="关">
                                                </el-switch>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="18">
                                            <el-form-item label="开启时段:" prop="sleepModeTime">
                                                <el-time-select
                                                        placeholder="起始时间"
                                                        v-model="strategy.sleepModeStartTime"
                                                        :picker-options="{
      start: '16:00',
      step: '00:15',
      end: '24:00'
    }">
                                                </el-time-select>
                                                <el-time-select
                                                        placeholder="结束时间"
                                                        v-model="strategy.sleepModeEndTime"
                                                        :picker-options="{
      start: '04:00',
      step: '00:15',
      end: '12:00',
      minTime: startTime
    }">
                                                </el-time-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="8" :offset="6">
                                            <el-form-item label="温度:" prop="sleepModeTemp">
                                                <el-input-number v-model="strategy.sleepModeTemp" :precision="1"
                                                                 :step="1" :max="31" :min="16"></el-input-number>℃
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="空调:" prop="sleepModeAirSwitch">
                                                <el-switch
                                                        v-model="strategy.sleepModeAirSwitch"
                                                        active-text="开"
                                                        inactive-text="关">
                                                </el-switch>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </el-collapse-item>
                            <el-collapse-item title="拔卡策略" name="2">
                                <template slot="title">
                                    拔卡策略
                                    <el-switch
                                            style="margin-left: 20px"
                                            v-model="enableds[0]"
                                            active-text="启用"
                                            inactive-text="禁用">
                                    </el-switch>
                                </template>
                                <el-card class="box-card">
                                    <el-row>
                                        <el-col :span="8">
                                            <el-form-item label="空调开关:" prop="cardoutSwitch">
                                                <el-switch
                                                        style="margin-left: 20px"
                                                        v-model="strategy.cardoutSwitch"
                                                        active-text="开"
                                                        inactive-text="关">
                                                </el-switch>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="空调模式:" prop="cardoutMode">
                                                <el-switch
                                                        style="margin-left: 20px"
                                                        v-model="strategy.cardoutMode"
                                                        active-text="自动"
                                                        inactive-text="手动">
                                                </el-switch>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="风速:" prop="cardoutspeed">
                                                <el-select v-model="strategy.cardoutSpeed" placeholder="请选择风速"
                                                           size="mini" style="width: 200px;">
                                                    <el-option
                                                            v-for="item in speeds"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="8">
                                            <el-form-item label="夏季插卡初始温度:" prop="cardoutSummerTemp">
                                                <el-input-number v-model="strategy.cardoutSummerTemp" :precision="1"
                                                                 :step="1" :max="31" :min="16"></el-input-number>&nbsp;℃
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="夏季插卡初始温度:" prop="cardoutWinterTemp">
                                                <el-input-number v-model="strategy.cardoutWinterTemp" :precision="1"
                                                                 :step="1" :max="31" :min="16"></el-input-number>&nbsp;℃
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            <el-form-item label="空调定时控制:" prop="cardoutControl">
                                                <el-switch
                                                        style="margin-left: 20px"
                                                        v-model="strategy.cardoutControl"
                                                        active-text="开"
                                                        inactive-text="关">
                                                </el-switch>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="定时时长:" prop="cardoutCycleTime">
                                                <el-input style="width: 150px;" prefix-icon="el-icon-edit" v-model="strategy.cardoutCycleTime"
                                                          placeholder="请输入时长"></el-input>&nbsp;分钟后关闭
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            <el-form-item label="手机远程控制:" prop="remoteControl">
                                                <el-switch
                                                        style="margin-left: 20px"
                                                        v-model="strategy.remoteControl"
                                                        active-text="开"
                                                        inactive-text="关">
                                                </el-switch>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="有效时长:" prop="remoteTime">
                                                <el-input style="width: 150px;" prefix-icon="el-icon-edit" v-model="strategy.remoteTime"
                                                          placeholder="请输入时长"></el-input>&nbsp;分钟后关闭
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </el-collapse-item>
                            <el-collapse-item title="入住策略" name="3">
                                <template slot="title">
                                    入住策略
                                    <el-switch
                                            style="margin-left: 20px"
                                            v-model="enableds[0]"
                                            active-text="启用"
                                            inactive-text="禁用">
                                    </el-switch>
                                </template>
                                <el-card class="box-card">
                                    <el-row>
                                        <el-col :span="8">
                                            <el-form-item label="空调开关:" prop="cardoutSwitch">
                                                <el-switch
                                                        style="margin-left: 20px"
                                                        v-model="strategy.cardoutSwitch"
                                                        active-text="开"
                                                        inactive-text="关">
                                                </el-switch>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="空调模式:" prop="cardoutMode">
                                                <el-switch
                                                        style="margin-left: 20px"
                                                        v-model="strategy.cardoutMode"
                                                        active-text="自动"
                                                        inactive-text="手动">
                                                </el-switch>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="风速:" prop="cardoutspeed">
                                                <el-select v-model="strategy.cardoutSpeed" placeholder="请选择风速"
                                                           size="mini" style="width: 200px;">
                                                    <el-option
                                                            v-for="item in speeds"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="8">
                                            <el-form-item label="夏季插卡初始温度:" prop="cardoutSummerTemp">
                                                <el-input-number v-model="strategy.cardoutSummerTemp" :precision="1"
                                                                 :step="1" :max="31" :min="16"></el-input-number>&nbsp;℃
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="夏季插卡初始温度:" prop="cardoutWinterTemp">
                                                <el-input-number v-model="strategy.cardoutWinterTemp" :precision="1"
                                                                 :step="1" :max="31" :min="16"></el-input-number>&nbsp;℃
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            <el-form-item label="空调定时控制:" prop="cardoutControl">
                                                <el-switch
                                                        style="margin-left: 20px"
                                                        v-model="strategy.cardoutControl"
                                                        active-text="开"
                                                        inactive-text="关">
                                                </el-switch>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="定时时长:" prop="cardoutCycleTime">
                                                <el-input style="width: 150px;" prefix-icon="el-icon-edit" v-model="strategy.cardoutCycleTime"
                                                          placeholder="请输入时长"></el-input>&nbsp;分钟后关闭
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </el-collapse-item>
                            <el-collapse-item title="空房策略" name="4">
                                <template slot="title">
                                    空房策略
                                    <el-switch
                                            style="margin-left: 20px"
                                            v-model="enableds[0]"
                                            active-text="启用"
                                            inactive-text="禁用">
                                    </el-switch>
                                </template>
                                <el-card class="box-card">
                                    <el-row>
                                        <el-col :span="8">
                                            <el-form-item label="空调开关:" prop="cardoutSwitch">
                                                <el-switch
                                                        style="margin-left: 20px"
                                                        v-model="strategy.cardoutSwitch"
                                                        active-text="开"
                                                        inactive-text="关">
                                                </el-switch>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="空调模式:" prop="cardoutMode">
                                                <el-switch
                                                        style="margin-left: 20px"
                                                        v-model="strategy.cardoutMode"
                                                        active-text="自动"
                                                        inactive-text="手动">
                                                </el-switch>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="风速:" prop="cardoutspeed">
                                                <el-select v-model="strategy.cardoutSpeed" placeholder="请选择风速"
                                                           size="mini" style="width: 200px;">
                                                    <el-option
                                                            v-for="item in speeds"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="8">
                                            <el-form-item label="夏季插卡初始温度:" prop="cardoutSummerTemp">
                                                <el-input-number v-model="strategy.cardoutSummerTemp" :precision="1"
                                                                 :step="1" :max="31" :min="16"></el-input-number>&nbsp;℃
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="夏季插卡初始温度:" prop="cardoutWinterTemp">
                                                <el-input-number v-model="strategy.cardoutWinterTemp" :precision="1"
                                                                 :step="1" :max="31" :min="16"></el-input-number>&nbsp;℃
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="6">
                                            <el-form-item label="空调定时控制:" prop="cardoutControl">
                                                <el-switch
                                                        style="margin-left: 20px"
                                                        v-model="strategy.cardoutControl"
                                                        active-text="开"
                                                        inactive-text="关">
                                                </el-switch>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="循环开启:" prop="cardoutSummerTemp">
                                                <el-input-number v-model="strategy.cardoutSummerTemp" :precision="1"
                                                                 :step="1" :max="60" :min="1"></el-input-number>&nbsp;分钟每小时
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </el-collapse-item>
                        </el-collapse>
                    </el-form>
                </div>
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
        name: "AirStrategy",
        data() {
            return {
                enableds: [],
                //默认激活的手风琴
                activeNames: 1,
                lowRunnings: [{id: 0, name: '低速运行'}, {id: 1, name: '关闭风机'}, {id: 2, name: '维持原状态'}],
                speeds: [{id: 0, name: '高速'}, {id: 1, name: '中速'}, {id: 2, name: '低速'}, {id: 3, name: '停止'}],
                strategys: [],
                multipleSelection: [],
                dialogVisible: false,
                strategy: {
                    name: '',
                    tempCorrect: 0,
                    lowRunning: null,
                    /*插卡部分*/
                    cardinSummerTemp: 24,
                    cardinWinterTemp: 26,
                    cardinSwitch: null,
                    cardinMode: null,
                    cardinSpeed: null,
                    sleepModeSwitch: null,
                    sleepModeEndTime: null,
                    sleepModeStartTime: null,
                    sleepModeTemp: 26,
                    sleepModeAirSwitch: null,
                    keepCardoutTemp:null,
                    /*拔卡部分*/
                    cardoutSummerTemp: 24,
                    cardoutWinterTemp: 26,
                    cardoutSwitch: null,
                    cardoutMode: null,
                    cardoutSpeed: null,
                },
                rules: {}
            }
        },
        mounted() {
            this.initStrategys();
        },
        methods: {
            addStrategy() {
                this.dialogVisible = true
            },
            handleDelete(row) {
                this.$confirm('此操作将永久删除[ ' + row.name + ' ]该策略, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    ids += 'ids=' + row.id;
                    this.deleteRequest('/air/strategy/' + ids).then(resp => {
                        if (resp) {
                            this.initStrategys();
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
                this.dialogVisible = true
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            initStrategys() {
                this.getRequest("/air/strategy/").then(resp => {
                    if (resp) {
                        this.strategys = resp;
                    }
                })
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
                    this.deleteRequest('/air/strategy/' + ids).then(resp => {
                        if (resp) {
                            this.initStrategys();
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

</style>