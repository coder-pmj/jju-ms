<template>
  <el-form ref="form" :model="form" :rules="rules" style="width:400px;margin:200px auto">
    <el-form-item>管理员登录</el-form-item>
    <el-form-item prop="user">
      <el-input placeholder="请输入账号" v-model="form.user">
        <template slot="prepend">账号</template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input placeholder="请输入密码" type="password" v-model="form.password">
        <template slot="prepend">密码</template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <a href="http://www.pmj136.top:8800/login">用户登录</a>
    </el-form-item>

    <el-form-item>
      <el-button @click="go('form')" type="primary">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        user: "",
        password: ""
      },
      rules: {
        user: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    go(f) {
      this.$refs[f].validate(v => {
        if (v) {
          axios
            .post("/api/admin/login", this.form)
            .then(res => {
              const resp = res.data;

              if (resp.flag) {
                this.$router.push("/auditing");
              } else {
                this.$message({
                  type: "error",
                  message: resp.message
                });
              }
            })
            .catch(err => {
              console.error(err);
            });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>