<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="上传固件" name="first"><AllFw></AllFw></el-tab-pane>
            <el-tab-pane label="固件类别" name="second"><FwType></FwType></el-tab-pane>
            <el-tab-pane label="模块类别" name="third"><ModuleType></ModuleType></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import AllFw from "../../components/fw/upload/AllFw";
    import FwType from "../../components/fw/upload/FwType";
    import ModuleType from "../../components/fw/upload/ModuleType";

    export default {
        name: "FwUpload",
        data(){
            return {
                activeName:'first',
            }
        },
        components:{
            AllFw,
            FwType,
            ModuleType
        }
    }
</script>

<style scoped>

</style>