<template>
    <div>
        <el-form :rules="rules" :model="loginForm" class="loginContainer" ref="loginForm">
            <h3 class="loginTitle">酒店内控系统登录</h3>
            <el-form-item prop="username">
                <el-input size="normal" type="text" v-model="loginForm.username" auto-complete="off"
                          placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input size="normal" type="text" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"
                          @keydown.enter.native="submitLogin"></el-input>
            </el-form-item>
            <el-checkbox size="normal" v-model="checked" class="loginRemember">记住我</el-checkbox>
            <el-button size="normal" type="primary" style="width:100%" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: 'johnny',
                    password: 'johnny'
                },
                checked: true,
                rules: {
                    //数据校验规则
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                }
            }
        },
        methods: {
            submitLogin() {
                //数据校验
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        //发送登录请求
                        this.postKeyValueRequest('/doLogin', this.loginForm).then(resp => {
                                //console.log(resp)
                                if (resp) {
                                    //保存用户信息至session
                                    window.sessionStorage.setItem('user', JSON.stringify(resp.obj));
                                    //页面跳转到home
                                    let path = this.$route.query.redirect;
                                    this.$router.replace((path == '/' || path == undefined) ? '/home' : path);
                                    //alert(JSON.stringify(resp));
                                    //初始化楼栋,楼层,房型,房间等数据
                                    this.initData();
                                }
                            }
                        )
                        //alert('submit!');
                    } else {
                        this.$message.error('您没有输入账号或密码');
                        return false;
                    }
                });
            },
            //初始化楼栋,楼层,房型,房间等数据
            initData() {
                this.getRequest('/setting/roomtype/').then(resp=>{
                    if(resp){
                        window.sessionStorage.setItem("roomTypes",JSON.stringify(resp));
                    }
                })
            }
        }
    }
</script>

<style>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505458;
    }

    .loginRemember {
        text-align: left;
        margin: 0px 0px 35px 0px;
    }
</style>