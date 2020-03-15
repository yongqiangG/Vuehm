<template>
    <div>
        <el-button type="primary" @click="downFw">下载固件</el-button>
    </div>
</template>

<script>
    export default {
        name: "FwDownload",
        data(){
            return {

            }
        },
        mounted() {

        },
        methods:{
            downFw(){
                window.open('/fw/upload/fwinfo/down/52', '_parent');
            }
        }
    }
</script>

<style scoped>

</style>