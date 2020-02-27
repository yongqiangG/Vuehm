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
        <div class="depMain">
            <el-tree :data="depTree" :props="defaultProps" node-key="id" ref="depTree"
                     :expand-on-click-node="false"
                     :filter-node-method="filterNode">
                <span class="custom-tree-node" slot-scope="{ node, data }"
                      style="display: flex;justify-content: space-between;width:100%;">
        <span>{{ data.name }}</span>
        <span class="btnClass">
          <el-button style="padding:3px;"
                     type="primary"
                     size="mini"
                     @click="showAddDep(data)">
            添加部门
          </el-button>
          <el-button style="padding:3px;"
                     type="danger"
                     size="mini"
                     @click="() => delDep(data)">
            删除部门
          </el-button>
        </span>
      </span>
            </el-tree>
        </div>
        <div>
            <el-dialog
                    title="添加部门"
                    :visible.sync="dialogVisible"
                    width="30%">
                <table>
                    <tr>
                        <td>
                            <el-tag type="success">上级部门</el-tag>
                        </td>
                        <td>{{parentName}}</td>
                    </tr>
                    <tr>
                        <td>
                            <el-tag type="success">部门信息</el-tag>
                        </td>
                        <td>
                            <el-input v-model="dep.name"></el-input>
                        </td>
                    </tr>
                </table>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doAddDep">确 定</el-button>
  </span>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    export default {
        name: "DepMana",
        watch: {
            depSearch(val) {
                this.$refs.depTree.filter(val);
            }
        },
        data() {
            return {
                depSearch: '',
                depTree: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                dialogVisible: false,
                dep: {
                    name: '',
                    parentId: -1
                },
                parentName: ''
            }
        },
        mounted() {
            this.initDepTree();
        },
        methods: {
            //动态删除部门
            delDepArr(p,depTree, id) {
                for (let i = 0; i < depTree.length; i++) {
                    let dep = depTree[i]
                    if (dep.id==id){
                        depTree.splice(i,1)
                        if(depTree.length==0){
                            //将父节点parent标志设置为false
                            p.parent=false
                        }
                    return;
                    }else{
                        this.delDepArr(dep,dep.children,id)
                    }
                        }
            },
            //删除部门
            delDep(data) {
                if (data.parent) {
                    this.$message.error("删除失败,该部门存在子部门")
                } else {
                    this.$confirm('此操作将永久删除[' + data.name + '], 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.deleteRequest('/system/basic/dep/' + data.id).then(resp => {
                            if(resp){
                                this.delDepArr(null,this.depTree,data.id)
                            }

                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });
                    })
                }
            },
            initDep() {
                this.dep = {
                    name: '',
                    parentId: -1
                }
                this.parentName = '';
            },
            //动态添加部门
            addDepTree(depTree, dep) {
                for (let i = 0; i < depTree.length; i++) {
                    let d = depTree[i]
                    if (d.id == dep.parentId) {
                        d.children = d.children.concat(dep);
                        console.log(d.children)
                        if (d.children.length > 0) {
                            d.parent = true;
                        }
                        return;
                    } else {
                        this.addDepTree(d.children, dep);
                    }
                }
            },
            //添加部门对话框
            showAddDep(data) {
                this.parentName = data.name
                this.dep.parentId = data.id
                this.dialogVisible = true;
            },
            //添加部门
            doAddDep() {
                this.postRequest('/system/basic/dep/', this.dep).then(resp => {
                    if (resp) {
                        this.dialogVisible = false;
                        //动态添加部门
                        this.addDepTree(this.depTree, resp.obj);
                        this.initDep();
                    }
                })
            },
            //搜索过滤部门树
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            //初始化部门树
            initDepTree() {
                let rootNode = -1
                this.getRequest('/system/basic/dep/p/' + rootNode).then(resp => {
                    this.depTree = resp;
                })
            }
        }
    }
</script>

<style scoped>
    .depMain {
        width: 500px;
        margin-top: 5px;
    }

</style>