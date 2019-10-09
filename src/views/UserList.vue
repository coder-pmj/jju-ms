<template>
  <div>
    <h2>用户列表页</h2>
    <el-input style="width:220px;margin-top:20px" placeholder="用户名/姓名/学号/手机号" v-model="searchStr"></el-input>
    <el-table :data="tableData" border height="578">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码">
        <template slot-scope="scope">
          <el-input v-model="scope.row.password" show-password></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="name" label="学生姓名"></el-table-column>
      <el-table-column prop="sno" label="学号"></el-table-column>
      <el-table-column prop="qq" label="QQ"></el-table-column>
      <el-table-column prop="phone" label="手机"></el-table-column>
      <el-table-column prop="descript" label="个人说明"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="removeuser(scope.row)">移除用户</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      searchStr: "",
      Data: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      axios
        .post("/api/admin/userlist")
        .then(res => {
          if (res.data.flag) {
            this.tableData = res.data.data;
            this.Data = this.tableData;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    removeuser(obj) {
      axios
        .post("/api/admin/removeuser", obj)
        .then(res => {
          const resp = res.data;
          this.$message({
            type: resp.flag ? "success" : "error",
            message: resp.message
          });
          if (resp.flag) {
            let index = this.tableData.indexOf(obj);
            this.tableData.splice(index, 1);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  watch: {
    searchStr(v) {
      // console.log(v);
      if (!v) {
        this.tableData = this.Data;
      } else {
        this.tableData = this.tableData.filter(k => {
          return (
            k.name.includes(v) ||
            k.sno.includes(v) ||
            k.phone.includes(v) ||
            k.username.includes(v)
          );
        });
      }
    }
  }
};
</script>

<style scoped>
</style>