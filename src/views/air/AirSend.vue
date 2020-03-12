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
                        <el-button
                                size="mini"
                                type="primary"
                                @click="changeStrategy(scope.row)">修改策略
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
    </div>
</template>

<script>
    export default {
        name: "AirSend",
        data() {
            return {
                multipleSelection: [],
                airs: []
            }
        },
        mounted() {
            this.initAirs();
        },
        methods: {
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
            handleSend(){

            },
            changeStrategy(){

            }
        }
    }
</script>

<style scoped>

</style>