<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="部门管理" name="first"><DepMana></DepMana></el-tab-pane>
            <el-tab-pane label="职位管理" name="second"><PosMana></PosMana></el-tab-pane>
            <el-tab-pane label="职称管理" name="third"><JobLevel></JobLevel></el-tab-pane>
            <el-tab-pane label="奖惩规则" name="fourth"><EcMana></EcMana></el-tab-pane>
            <el-tab-pane label="权限组" name="fourth2"><PermissMana></PermissMana></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import DepMana from "../../component/basic/DepMana";
    import EcMana from "../../component/basic/EcMana";
    import JobLevel from "../../component/basic/JobLevel";
    import PermissMana from "../../component/basic/PermissMana";
    import PosMana from "../../component/basic/PosMana";

    export default {
        name: "SysBasic",
        data(){
            return {
                activeName:'second'
            }
        },
        components:{
            DepMana,
            EcMana,
            JobLevel,
            PermissMana,
            PosMana
        }
    }
</script>

<style scoped>

</style>