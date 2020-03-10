<template>
    <div>
        <div style="display: flex;justify-content: space-between">
            <div>
                <el-input placeholder="请输入房号进行搜索..."
                          prefix-icon="el-icon-search"
                          clearable
                          @clear="initRooms"
                          style="width: 200px;margin-right: 5px"
                          v-model="keyword"
                          @keydown.enter.native="initRooms"
                ></el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
            <div>
                <el-button type="primary" @click="addRoom">新增</el-button>
                <el-button type="primary" @click="addMultiRoom">批量新增</el-button>
                <el-button type="primary" @click="">更新服务器</el-button>
                <el-button type="primary" @click="">套房合并</el-button>
                <el-button type="primary" @click="">套房分解</el-button>
                <el-button type="primary" @click="">有效期刷新</el-button>
                <el-button type="primary" @click="">时间同步</el-button>
            </div>
        </div>
        <div>
            <el-table
                    :data="rooms"
                    @selection-change="handleSelectionChange"
                    border
                    stripe
                    v-loading="loading"
                    class="roomTable">
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
                        prop="roomNo"
                        label="房号"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="roomType.name"
                        label="房间类型"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="building.name"
                        label="楼栋名称"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="txFloor.name"
                        label="楼层名称"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="machineCode"
                        label="机器码"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="ip"
                        label="设备Ip"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="port"
                        label="端口"
                        width="60">
                </el-table-column>
                <el-table-column
                        prop="online"
                        label="在线状态"
                        width="70">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.online">在线</el-tag>
                        <el-tag type="info" v-else>掉线</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="expiredDate"
                        label="设备有效期"
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
            <div style="display: flex;justify-content: space-between;margin-top: 5px">
            <el-button type="danger" size="small" @click="deleteMany"
                       :disabled="multipleSelection.length==0">批量删除
            </el-button>
                <div style="display: flex;justify-content: flex-end">
                    <el-pagination
                            background
                            @current-change="currentChange"
                            @size-change="sizeChange"
                            layout="sizes, prev, pager, next, jumper, ->, total, slot"
                            :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div>
            <el-dialog
                    title="修改房间信息"
                    :visible.sync="dialogVisible"
                    width="30%">
                <table>
                    <tr>
                        <td><el-tag>房型</el-tag></td>
                        <td><el-select v-model="updateRoom.roomTypeId" placeholder="请选择房型" style="width: 200px;margin-left: 8px">
                            <el-option
                                    v-for="item in roomTypes"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select></td>
                    </tr>
                    <tr>
                        <td><el-tag>楼层</el-tag></td>
                        <td><el-select v-model="updateRoom.roomTypeId" placeholder="请选择房型" style="width: 200px;margin-left: 8px">
                            <el-option
                                    v-for="item in roomTypes"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select></td>
                    </tr>
                    <tr>
                        <td><el-tag>房号</el-tag></td>
                        <td><el-input
                                size="small"
                                style="width: 200px;margin-left: 8px"
                                v-model="updateRoom.roomNo">
                        </el-input></td>
                    </tr><tr>
                        <td><el-tag>机器码</el-tag></td>
                        <td><el-input
                                size="small"
                                style="width: 200px;margin-left: 8px"
                                v-model="updateRoom.machineCode">
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
        name: "SetRoom",
        data(){
            return{
                keyword:'',
                rooms:[],
                multipleSelection:[],
                total: 0,
                page: 1,
                size: 10,
                loading: false,
                dialogVisible:false,
                updateRoom:{
                    roomNo:'',
                    machineCode:'',
                    floorId:null,
                    roomTypeId:null
                },
                roomTypes:[],
                floors:[]
            }
        },
        mounted() {
            this.initData();
            this.initRooms();
        },
        methods:{
            initData(){
                //获取所有房型id和名称,赋值roomTypes[]
                //获取所有楼层id和名称,含楼栋前缀,赋值floors
            },
            initRooms(){
                this.loading=true
                let url='/setting/room/?page='+this.page+'&size='+this.size+'&kw='+this.keyword;
                this.getRequest(url).then(resp=>{
                    this.loading=false
                    this.rooms=resp.obj.data;
                    this.total=resp.obj.total;
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleEdit(row){
                this.updateRoom.roomNo=row.roomNo
                this.updateRoom.machineCode=row.machineCode
                this.dialogVisible=true
            },
            handleDelete(row){
                this.$confirm('此操作将永久删除[ '+row.roomNo+' ]该房间, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    ids += 'ids=' + row.id;
                    this.deleteRequest('/setting/room/' + ids).then(resp => {
                        if (resp) {
                            this.initRooms();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            deleteMany(){
                this.$confirm('此操作将永久删除[ '+this.multipleSelection.length+' ]条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item=>{
                        ids += 'ids=' + item.id+'&';
                    })
                    this.deleteRequest('/setting/room/' + ids).then(resp => {
                        if (resp) {
                            this.initRooms();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            currentChange(currentPage){
                this.page=currentPage;
                this.initRooms();
            },
            sizeChange(currentSize){
                this.size=currentSize;
                this.initRooms();
            },
            updateSubmit(){
                this.dialogVisible=false
            },
            initRoom(){
                this.updateRoom={
                    roomNo: '',
                    machineCode: '',
                    floorId: null,
                    roomTypeId: null
                }
            },
            addRoom(){
                this.initRoom();
                this.dialogVisible=true
            },
            addMultiRoom(){

            }
        }
    }
</script>

<style>
    .roomTable{
        margin-top: 8px;
    }
</style>