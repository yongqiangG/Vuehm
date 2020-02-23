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
                <el-collapse-item title="一致性 Consistency" name="1">
                    <el-card class="box-card">
                        <div v-for="o in 4" :key="o" class="text item">
                            {{'列表内容 ' + o }}
                        </div>
                        <div>
                            <el-tree
                                    :props="props"
                                    :load="loadNode"
                                    lazy
                                    show-checkbox
                                    @check-change="handleCheckChange">
                            </el-tree>
                            <div>
                                <el-button >取消修改</el-button>
                                <el-button type="primary">确认修改</el-button>
                            </div>
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
                activeNames:-1
            }
        },
        mounted() {

        },
        methods:{
            //新增角色
            addRole(){},
            //点击折叠面板事件
            handleChange(){
                console.log("CHANGETREE");
            }
        }
    }
</script>

<style scoped>
    .roleMenuTree{
        margin-top: 8px;
    }
</style>