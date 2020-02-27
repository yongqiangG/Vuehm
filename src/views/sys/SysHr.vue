<template>
    <div>
        <div class="searchInput">
            <el-input
                    size="small"
                    style="width:400px;"
                    placeholder="输入用户姓名,回车搜索"
                    @keydown.enter.native="searchBtn"
                    prefix-icon="el-icon-search"
                    v-model="keyword">
            </el-input>
            <el-button type="primary" size="small" style="margin-left: 8px" @click="searchBtn" icon="el-icon-search">
                搜索
            </el-button>
        </div>
        <div class="hrMain">
            <el-card v-for="(hr,index) in hrs" :key="index" class="hrCard">
                <div slot="header" class="clearfix">
                    <span>{{hr.name}}</span>
                    <el-button style="float: right; padding: 3px 0;color: red" type="text"
                               icon="el-icon-delete"></el-button>
                </div>
                <div class="userImg">
                    <img :src="hr.userface" :alt="hr.name" :title="hr.name" class="user-img">
                </div>
                <div class="userInfo">
                    <div>用户名: {{hr.name}}</div>
                    <div>手机号码: {{hr.phone}}</div>
                    <div>电话号码: {{hr.telephone}}</div>
                    <div>地址: {{hr.address}}</div>
                    <div>用户状态:
                        <el-switch
                                v-model="hr.enabled"
                                @change="enabledChange(hr)"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="启用"
                                inactive-text="禁用">
                        </el-switch>
                    </div>
                    <div>
                        用户角色:<el-tag v-for="(role,indexj) in hr.roles" :key="indexj" style="margin-left: 3px;" type="success">{{role.nameZh}}</el-tag>
                        <el-popover
                                placement="right"
                                title="角色列表"
                                @hide="hidePop(hr)"
                                @show="showPop(hr)"
                                width="200"
                                trigger="click">
                            <el-select v-model="selectedRole" multiple placeholder="请选择">
                                <el-option
                                        v-for="(r,index) in allRoles"
                                        :key="index"
                                        :label="r.nameZh"
                                        :value="r.name">
                                </el-option>
                            </el-select>
                            <el-button slot="reference" icon="el-icon-more" type="text"></el-button>
                        </el-popover>
                    </div>
                    <div>备注: {{hr.remark}}</div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SysHr",
        data() {
            return {
                keyword: '',
                hrs: [],
                allRoles:[],
                selectedRole:''
            }
        },
        mounted() {
            this.initHrs()
        },
        methods: {
            searchBtn() {

            },
            enabledChange(hr){

            },
            initHrs() {
                this.getRequest('/system/hr/').then(resp => {
                    if (resp) {
                        this.hrs = resp;
                    }
                })
            },
            initRoles(){
                this.getRequest('/system/basic/per/roles').then(resp=>{
                    if(resp){
                        this.allRoles=resp;
                    }
                })
            }
        }
    }
</script>

<style>
    .userInfo div{
        font-size: 14px;
        color: #409eff;
    }

    .userInfo {
        margin-top: 20px;
    }

    .searchInput {
        display: flex;
        justify-content: center;
    }

    .hrMain {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-top: 5px;
    }

    .hrCard {
        width: 350px;
        margin-bottom: 20px;
    }

    .userImg {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .user-img {
        width: 72px;
        height: 72px;
        border-radius: 72px;
    }

    .userInfo {

    }
</style>