<template>
    <div>
        <div>
            <el-input
                    placeholder="输入部门名称搜索"
                    style="width: 500px;"
                    prefix-icon="el-icon-search"
                    v-model="depSearch">
            </el-input>
        </div>
        <div>
            <el-tree :data="depTree" :props="defaultProps" show-checkbox node-key="id" :key="index"
                     ref="depTree">
            </el-tree>
        </div>

    </div>
</template>

<script>
    export default {
        name: "DepMana",
        data(){
            return{
                depSearch:'',
                depTree:[],
                defaultProps:{
                    children: 'id',
                    label: 'name'
                }
            }
        }
    }
</script>

<style scoped>

</style>