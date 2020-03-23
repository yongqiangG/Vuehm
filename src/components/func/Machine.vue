<template>
    <div>
        <table>
            <tr>
                <td>机器码:</td>
                <el-input v-model="bindMac.machineCode"></el-input>
            </tr>
            <tr>
                <td>设备ip:</td>
                <el-input v-model="bindMac.ipAddr"></el-input>
            </tr>
            <tr>
                <td>广播ip:</td>
                <el-input v-model="bindMac.broadcastIp"></el-input>
            </tr>
            <tr>
                <el-button type="primary" @click="bindMachine">绑定设备</el-button>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "Machine",
        data() {
            return {
                bindMac: {
                    machineCode: '',
                    ipAddr: '',
                    broadcastIp: ''
                }
            }
        },
        methods: {
            bindMachine() {
                if (this.bindMac.machineCode != '' || this.bindMac.ipAddr != '' || this.bindMac.broadcastIp != '') {
                    this.postRequest('/func/test/bind', this.bindMac).then(resp => {
                        if (resp) {

                        }
                    })
                }else{
                    this.$message.info('必须填写所有字段')
                }
            }
        }
    }
</script>

<style scoped>

</style>