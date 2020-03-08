<template>
    <div>
        <div>
            <el-button type="primary" @click="multiSend">批量发送</el-button>
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
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="air1name"
                        label="空调1"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="air1name"
                        label="空调1"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="air1name"
                        label="空调1"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="air1name"
                        label="空调1"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="air1name"
                        label="空调1"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="air1name"
                        label="空调1"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="air1name"
                        label="空调1"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="air1name"
                        label="空调1"
                        width="100">
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
                    title="修改楼栋名称"
                    :visible.sync="dialogVisible"
                    width="30%">
                <el-tag>楼栋名称</el-tag>
                <el-input
                        size="small"
                        style="width: 200px;margin-left: 8px"
                        v-model="updateBuilding.name">
                </el-input>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateSubmit" >确 定</el-button>
  </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AirCount",
        data(){
            return{
                roomTypes:[],
                multipleSelection:[],
                dialogVisible:false,
                updateAir:{

                }
            }
        },
        mounted() {

        },
        methods:{
            initRoomType(){
                if(!window.sessionStorage.getItem('roomTypes')){
                    this.getRequest('/air/count/').then(resp=>{
                        this.roomTypes=resp;
                        window.sessionStorage.setItem('roomTypesWithAir',JSON.stringify('resp'))
                    })
                }else{
                    this.roomTypes=JSON.parse(window.sessionStorage.getItem('roomTypesWithAir'))
                }
            },
            /*批量发送空调数量*/
            multiSend(){

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleEdit(row){
                this.dialogVisible=true;
            },
            handleSend(row){

            }
        }
    }
</script>

<style>
.MainTable{
    margin-top: 5px;
}
</style>