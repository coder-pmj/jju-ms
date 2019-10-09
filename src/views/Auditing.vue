<template>
  <div>
    <h2>待审核列表</h2>

    <el-table :data="tableData" border height="578">
      <el-table-column prop="item_type" label="类型">
        <template slot-scope="scope">{{scope.row.item_type|typefilter}}</template>
      </el-table-column>
      <el-table-column prop="url" label="图片" width="200">
        <template slot-scope="scope">
          <img v-if="scope.row.url" :src="'/api/images/'+scope.row.url" width="180" />
          <span v-else>暂无图片</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="user" label="用户">
        <template slot-scope="scope">{{scope.row.user|userfilter}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleYes(scope.row)">通过</el-button>
          <el-button size="mini" type="danger" @click="handleNo(scope.row)">pass</el-button>
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
      selectData: [],
      flagYes: true,
      flagNo: true,
      msg: ""
    };
  },
  created() {
    this.getData();
  },
 
  
  methods: {
    getData() {
      axios
        .post("/api/admin/item")
        .then(res => {
          const resp = res.data;
          this.tableData = resp.data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleYes(d) {
      // console.log(d);
      if (this.flagYes) {
        this.flagYes = false;
        d.date = this.getTime();
        axios
          .post("/api/admin/handleyes", d)
          .then(res => {
            const resp = res.data;

            if (resp.flag) {
              this.msg = "审核成功";
              axios
                .post("/api/admin/sendmsg", {
                  user: d.user,
                  date: this.getTime(),
                  content: this.msg,
                  obj: d.title,
                  sendfrom: "系统"
                })
                .then(res => {
                  this.$message(res.data.message);
                })
                .catch(err => {
                  console.error(err);
                });
              //console.log(d.index)
              let index = this.tableData.indexOf(d);
              this.tableData.splice(index, 1);
              setTimeout(() => {
                this.flagYes = true;
              }, 2000);
            }
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        this.showMsg();
      }
    },
    /* 审核不通过 */
    handleNo(d) {
      /* 删数据 */
      if (this.flagNo) {
        this.flagNo = false;
        axios
          .post("/api/admin/handleno", d)
          .then(res => {
            const resp = res.data;
            if (resp.flag) {
              /* 发送邮件给用户 */
              this.msg = "审核未通过";
              axios
                .post("/api/admin/sendmsg", {
                  user: d.user,
                  date: this.getTime(),
                  content: this.msg,
                  obj: d.title,
                  sendfrom: "系统"
                })
                .then(res => {
                  this.$message(res.data.message);
                })
                .catch(err => {
                  console.error(err);
                });
              //
              let index = this.tableData.indexOf(d);
              this.tableData.splice(index, 1);
              setTimeout(() => {
                this.flagNo = true;
              }, 1800);
            }
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        this.showMsg();
      }
    },
    showMsg() {
      this.$message({
        type: "info",
        message: "您的操作太快了哦",
        duration: 1000
      });
    },
    /* 获取时间 */
    getTime() {
      let da = new Date(),
        n = da.getFullYear(), //年
        y = this.checkTime(da.getMonth() + 1), //月
        r = this.checkTime(da.getDate()), //日
        s = this.checkTime(da.getHours()), //时
        f = this.checkTime(da.getMinutes()), //分
        m = this.checkTime(da.getSeconds()); //秒

      return `${n}-${y}-${r} ${s}:${f}:${m}`;
    },
    /* 转换时间格式 */
    checkTime(d) {
      if (d < 10) {
        return `0${d}`;
      } else {
        return d;
      }
    }
  },
  filters: {
    typefilter(v) {
      if (v == "t") {
        return "投稿";
      } else if (v == "s") {
        return "失物招领";
      } else if (v == "h") {
        return "话题";
      }
    },
    userfilter(v) {
      if (!v) {
        return "匿名用户";
      } else {
        return v;
      }
    }
  }
};
</script>

<style scoped>
</style>