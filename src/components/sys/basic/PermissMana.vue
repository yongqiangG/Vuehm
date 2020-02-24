<template>
    <div>
        <div>
            <el-input placeholder="请输入角色英文名称" v-model="role.name" style="width: 300px">
                <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input
                    placeholder="请输入角色中文名称"
                    style="width: 300px;margin-left: 10px"
                    v-model="role.nameZh">
            </el-input>
            <el-button type="primary" prefix-icon="el-icon-plus" style="margin-left: 10px" @click="addRole">添加
            </el-button>
        </div>
        <div class="roleMenuTree">
            <el-collapse v-model="activeNames" @change="handleChange" accordion>
                <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可操作的菜单</span>
                            <el-button style="float: right; padding: 3px 0;color:red" type="text"
                                       icon="el-icon-delete" @click="delRole(r.id)"></el-button>
                        </div>
                        <div>
                            <el-tree :data="menuTree" :props="defaultProps" show-checkbox node-key="id" :key="index"
                                     :default-checked-keys="defaultCheckedKeys" ref="menuTree"
                                     :default-expanded-keys="[2]">
                            </el-tree>
                        </div>
                        <div class="editBtn">
                            <el-button @click="cancelUpdate">取消修改</el-button>
                            <el-button type="primary" @click="updateMid(r.id,index)">确认修改</el-button>
                        </div>
                    </el-card>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PermissMana",
        data() {
            return {
                role: {
                    name: '',
                    nameZh: ''
                },
                //默认激活的手风琴
                activeNames: -1,
                //所有角色
                roles: [],
                menuTree: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                defaultCheckedKeys: [],

            }
        },
        mounted() {
            this.initRoles();
        },
        methods: {
            //新增角色
            addRole() {
                this.postRequest('system/basic/per/', this.role).then(resp => {
                    this.role.name = ''
                    this.role.nameZh = ''
                    this.initRoles()
                })
            },
            //删除角色
            delRole(rid) {
                this.deleteRequest('system/basic/per/' + rid).then(resp => {
                    this.initRoles()
                })
            },
            //点击折叠面板事件,tree初始化
            handleChange(name) {
                if (name) {
                    this.initMenusTree();

                    this.initMidByRid(name);
                }
                //加载默认选中菜单项
            },
            //初始化所有角色
            initRoles() {
                this.getRequest('/system/basic/per/roles').then(resp => {
                    this.roles = resp;
                })
            },
            initMenusTree() {
                this.getRequest('/system/basic/per/menus').then(resp => {
                    this.menuTree = resp;
                })
            },
            initMidByRid(name) {
                this.getRequest('/system/basic/per/m/' + name).then(resp => {
                    this.defaultCheckedKeys = resp;
                })
            },
            //取消修改
            cancelUpdate() {
                this.activeNames = -1
                this.$message.info("已取消修改")
            },
            //确认修改
            updateMid(rid, index) {
                let tree = this.$refs.menuTree[index]
                let mids = tree.getCheckedKeys(true)
                let url = '/system/basic/per/?rid=' + rid
                mids.forEach(mid => {
                    url += '&mids=' + mid
                })
                this.putRequest(url).then(resp => {
                    this.activeNames = -1
                })
            }
        }
    }
</script>

<style scoped>
    .roleMenuTree {
        margin-top: 8px;
        width: 600px;
    }

    .editBtn {
        display: flex;
        justify-content: flex-end;
    }
</style>