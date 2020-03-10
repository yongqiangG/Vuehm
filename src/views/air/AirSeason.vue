<template>
    <div>
        <div style="width: 50%">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>空调季节设置</span>
                    <el-button style="float: right" type="primary" size="small" icon="el-icon-success">保存设置</el-button>
                </div>
                <div>
                    <el-row>
                        <el-col :span="12">
                            <el-switch
                                    style="display: block"
                                    v-model="season.workMode"
                                    active-color="#13ce66"
                                    inactive-color="#537EFF"
                                    active-text="夏季(制冷)"
                                    inactive-text="冬季(制热)">
                            </el-switch>
                        </el-col>
                        <el-col :span="12">
                            <el-switch
                                    style="display: block"
                                    v-model="season.valveMode"
                                    active-color="#13ce66"
                                    inactive-color="#537EFF"
                                    active-text="单阀"
                                    inactive-text="双阀">
                            </el-switch>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 10px">
                        <el-col :span="12">
                            <el-switch
                                    style="display: block"
                                    v-model="season.electricHeating"
                                    active-color="#13ce66"
                                    inactive-color="#537EFF"
                                    active-text="电加热开"
                                    inactive-text="电加热关">
                            </el-switch>
                        </el-col>
                        <el-col :span="12">
                            <el-switch
                                    style="display: block"
                                    v-model="season.infraredControl"
                                    active-color="#13ce66"
                                    inactive-color="#537EFF"
                                    active-text="红外控制开"
                                    inactive-text="红外控制关">
                            </el-switch>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "AirSeason",
        data(){
            return {
                season:{
                    workMode:false,
                    valveMode:false,
                    electricHeating:false,
                    infraredControl:false
                }
            }
        }
    }
</script>

<style>

</style>