<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">酒店内控管理系统</div>
                <div>
                    <el-button icon="el-icon-bell" type="text" style="margin-right: 8px;color:#000000;" size="normal"
                               @click="goChat"></el-button>
                    <el-dropdown class="userinfo" @command="commandHandler">
  <span class="el-dropdown-link">
    {{user.name}}<i><img :src="user.userface" alt=""></i>
  </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                            <el-dropdown-item command="setting">设置</el-dropdown-item>
                            <el-dropdown-item divided command="logout">注销登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>

            <el-container>
                <el-aside width="200px">
                    <el-menu router unique-opened>
                        <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
                            <template slot="title">
                                <i :class="item.iconCls" style="color:#409eff;margin-right: 8px"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item :class="child.iconCls" :index="child.path"
                                          v-for="(child,childIndex) in item.children" :key="childIndex"> {{child.name}}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
                        欢迎来到酒店内控管理系统
                    </div>
                    <router-view class="homeArea"/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                user: JSON.parse(window.sessionStorage.getItem("user"))
            }
        },
        computed: {
            routes() {
                return this.$store.state.routes;
            }
        },
        methods: {
            goChat() {
                this.$router.push('/chat')
            },
            commandHandler(command) {
                if (command == 'logout') {
                    this.$confirm('您确定要退出登录吗, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest('/logout');
                        window.sessionStorage.removeItem('user');
                        window.sessionStorage.removeItem('roomTypes');
                        //清空store中的菜单数据
                        this.$store.commit('initRoutes', []);
                        this.$router.replace('/');
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .homeArea {
        margin-top: 10px;
    }

    .homeWelcome {
        text-align: center;
        font-size: 50px;
        font-family: 楷体;
        color: #409eff;
        padding-top: 50px;

    }

    .homeHeader {
        background-color: #409eff;
        /*弹性盒模型*/
        display: flex;
        /*居中对齐*/
        align-items: center;
        /*中间留白*/
        justify-content: space-between;
        padding: 0px 15px;
        box-sizing: border-box;
    }

    .homeHeader .title {
        font-size: 30px;
        font-family: 楷体;
        color: #ffffff;
    }

    .userinfo {
        cursor: pointer;
    }

    .el-dropdown-link {
        display: flex;
        align-items: center;
    }

    .el-dropdown-link img {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }

</style>