<template>
    <div>
        <div>
            <el-button type="primary" @click="multiSend" :disabled="multipleSelection.length==0"
                       style="margin-top: 5px">批量发送
            </el-button>
        </div>
        <div>
            <el-table
                    :data="airs"
                    @selection-change="handleSelectionChange"
                    border
                    stripe
                    style="margin-top: 5px;width: 80%;"
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
                        prop="roomType.name"
                        label="房间类型"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="airName"
                        label="空调名称"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="airNo"
                        label="房间空调序号"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="airStrategy.name"
                        label="空调策略"
                        width="100">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-popover
                                placement="left"
                                title="修改空调策略"
                                @show="showPop(scope.row)"
                                @hide="hidePop(scope.row)"
                                width="200"
                                style="margin-right: 10px"
                                trigger="click">
                            <div>
                                <el-select v-model="air.airStrategyId" placeholder="请选择" size="mini">
                                    <el-option
                                            v-for="item in airStrategys"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <el-button slot="reference" type="danger" size="mini">修改策略</el-button>
                        </el-popover>
                        <el-button
                                size="mini"
                                type="success"
                                @click="handleSend(scope.row)">发送
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AirSend",
        data() {
            return {
                multipleSelection: [],
                airs: [],
                airStrategys: [],
                air: {
                    id: null,
                    airStrategyId: null,
                },
                currentStrategy: null,
        }
        },
        mounted() {
            this.initAirs();
            this.initAirStartegys();
        },
        methods: {
            hidePop(row) {
                    this.putRequest('/air/send/', this.air).then(resp => {
                        if (resp) {
                            this.initAirs();
                        }
                    })
            },
            showPop(row) {
                this.air.airStrategyId = null;
                this.air.id = null;
                if (row) {
                    this.air.airStrategyId = row.airStrategyId;
                    this.air.id = row.id
                }
            },
            //获取所有的策略
            initAirStartegys() {
                this.getRequest('/air/strategy/').then(resp => {
                        if (resp) {
                            this.airStrategys = resp;
                        }
                    }
                )
            },
            //批量发送
            multiSend() {

            },
            initAirs() {
                this.getRequest('/air/send/').then(resp => {
                    if (resp) {
                        this.airs = resp;
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSend() {

            },
            changeStrategy() {

            }
        }
    }
</script>

<style scoped>

</style>