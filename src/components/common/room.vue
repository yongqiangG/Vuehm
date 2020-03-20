<template>
    <div>
        <el-dialog
                title="发送空调数量"
                :visible.sync="sendDialogVisible"
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
        name: "room",
        data(){
            return {
                sendDialogVisible:true,
                roomTypeName:'',
                multipleSelection1:[],
                rooms:[],
                loading:false,
            }
        },
        methods:{
            handleSelectionChange1(val) {
                this.multipleSelection1 = val;
            },
        }
    }
</script>

<style scoped>

</style>