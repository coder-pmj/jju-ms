<template>
  <div>
    <h2>学生列表页</h2>
    <el-input style="width:200px;margin-top:20px" placeholder="搜索" v-model="searchStr"></el-input>
    <el-button type="primary" @click="showaddStudent">添加学生</el-button>
    <el-table :data="tableData" border height="578">
      <el-table-column prop="name" label="学生姓名"></el-table-column>
      <el-table-column prop="sno" label="学号"></el-table-column>
      <el-table-column prop="used" label="是否已绑定用户账号">
        <template slot-scope="scope">{{scope.row.used|tfilter}}</template>
      </el-table-column>
      <el-table-column label="将学生信息与账户解绑">
        <template slot-scope="scope">
          <el-button v-if="scope.row.used=='1'" size="mini" @click="resetRegedit(scope.row)">重置注册</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增学生" :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="formStudent" ref="forms" :rules="rules">
        <el-form-item label="学生姓名" prop="name">
          <el-input v-model="formStudent.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学生学号" prop="sno">
          <el-input v-model="formStudent.sno" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudent('forms')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      Data: [],
      formStudent: {
        name: "",
        sno: ""
      },
      rules: {
        name: [{ required: true, trigger: "blur", message: "请输入姓名" }],
        sno: [{ required: true, trigger: "blur", message: "请输入学号" }]
      },
      searchStr: ""
    };
  },
  created() {
    this.initData();
  },
  methods: {
    showaddStudent() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.forms.resetFields();
      });
    },
    addStudent(f) {
      this.$refs[f].validate(v => {
        if (v) {
          axios
            .post("/api/admin/addstudent", this.formStudent)
            .then(res => {
              const resp = res.data;
              this.$message({
                type: resp.flag ? "success" : "error",
                message: resp.message
              });
              if (resp.flag) {
                this.dialogFormVisible = false;
                this.initData();
              }
            })
            .catch(err => {
              console.error(err);
            });
        }
      });
    },
    initData() {
      axios
        .post("/api/admin/getstudentlist")
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
    resetRegedit(obj) {
      axios
        .post("/api/admin/resetregedit", { id: obj.id, name: obj.name })
        .then(res => {
          const resp = res.data;
          if (resp.flag) {
            // console.log(obj)

            this.initData();
            this.$message({
              type: "success",
              message: resp.message
            });
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
          return k.name.includes(v) || k.sno.includes(v);
        });
      }
    }
  },
  filters: {
    tfilter(v) {
      if (v == "1") {
        return "是(yes)";
      } else {
        return "否(no)";
      }
    }
  }
};
</script>

<style scoped>
</style>