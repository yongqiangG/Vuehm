<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="上传固件" name="first"><AllFw></AllFw></el-tab-pane>
            <el-tab-pane label="固件类型" name="second"><FwType></FwType></el-tab-pane>
            <el-tab-pane label="支持功能" name="third"><ModuleType></ModuleType></el-tab-pane>
        </el-tabs>
        <Room :dialogVisible1="true"></Room>
    </div>
</template>

<script>
    import AllFw from "../../components/fw/upload/AllFw";
    import FwType from "../../components/fw/upload/FwType";
    import ModuleType from "../../components/fw/upload/ModuleType";
    import Room from "../../components/common/room.vue";

    export default {
        name: "FwUpload",
        data(){
            return {
                activeName:'first',
            }
        },
        components: {
            AllFw,
            FwType,
            ModuleType,
            Room,
        }
    }
</script>

<style scoped>

</style>