<template>
    <div>
        <div>
            <el-select v-model="keyWord" placeholder="请选择固件类型" prefix-icon="el-icon-search" clearable @change="initFws"
                       @clear="initFws">
                <el-option
                        v-for="item in fwTypes"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div>
            <el-table
                    :data="fws"
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
                                           ></el-button>
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
                        width="250">
                    <template slot-scope="scope">
                        <div v-if="scope.row.moduleTypes<3">
                            <el-tag v-for="(type,index) in scope.row.moduleTypes"
                                    :key="index" style="margin-left: 3px;" type="success">{{type.name}}
                            </el-tag>
                            <el-popover
                                    placement="right"
                                    title="支持功能列表"
                                    width="300"
                                    trigger="click">
                                <ol>
                                    <li v-for="(item,index) in scope.row.moduleTypes">{{item.name}}</li>
                                </ol>
                                <el-button slot="reference" icon="el-icon-more" type="text"
                                           ></el-button>
                            </el-popover>
                        </div>
                        <div v-else>
                            <el-tag v-for="(type,index) in scope.row.moduleTypes.slice(0,2)"
                                    :key="index" style="margin-left: 3px;" type="success">{{type.name}}
                            </el-tag>
                            <el-popover
                                    placement="right"
                                    title="支持功能列表"
                                    width="300"
                                    trigger="click">
                                <ol>
                                    <li v-for="(item,index) in scope.row.moduleTypes">{{item.name}}</li>
                                </ol>
                                <el-button slot="reference" icon="el-icon-more" type="text"
                                           ></el-button>
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
                                           ></el-button>
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
                                type="primary"
                                @click="downFw(scope.row)">下载
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
</template>

<script>
    export default {
        name: "FwDownload",
        data() {
            return {
                total: 0,
                page: 1,
                size: 10,
                keyWord: null,
                fws: [],
                fwTypes:[],
            }
        },
        mounted() {
            this.initFwTypes()
            this.initFws()
        },
        methods: {
            currentChange(currentPage){
                this.page=currentPage;
                this.initFws();
            },
            sizeChange(currentSize){
                this.size=currentSize;
                this.initFws();
            },
            initFwTypes() {
                this.getRequest('/fw/download/fwtype/').then(resp => {
                    if (resp) {
                        this.fwTypes = resp
                    }
                })
            },
            initFws() {
                if (this.keyWord == null) {
                    this.keyWord = ''
                }
                let url = '/fw/download/fwinfo/?page=' + this.page + '&size=' + this.size + '&fwTypeId=' + this.keyWord;
                this.getRequest(url).then(resp => {
                    if (resp) {
                        this.fws = resp.obj.data;
                        this.total = resp.obj.total
                    }
                })
            },
            downFw(row) {
                window.open('/fw/download/down/' + row.id, '_parent');
            }
        }
    }
</script>

<style scoped>

</style>