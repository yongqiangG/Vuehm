<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="设备绑定" name="first">
                <Machine></Machine>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    import Machine from '../../components/func/Machine';

    export default {
        name: "FuncTest",
        components: {Machine},
        data() {
            return {
                activeName:'first'
            }
        },
        methods: {
            start3339Listen() {
                this.getRequest('/func/test/startListen').then(resp => {
                    if (resp) {

                    }
                })
            },
            close3339Listen() {

            }
        }
    }
</script>

<style scoped>

</style>