<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$message({
      message: "尊敬的管理员  " + this.currentTime + "好"
    });
  },
  computed: {
    currentTime() {
      let time = this.getTime().substr(11, 2);
      if (Number(time) < 12 && Number(time) > 6) {
        return "上午";
      } else if (Number(time) > 12 && Number(time) < 18) {
        return "下午";
      } else if (Number(time) > 18 && Number(time) < 24) {
        return "晚上";
      } else if (Number(time) == 12) {
        return "中午";
      } else if (Number(time) >= 0 && Number(time) < 3) {
        return "深夜";
      } else {
        return "凌晨";
      }
    }
  },
  methods: {
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
  }
};
</script>

<style>
a {
  text-decoration: none;
}
</style>