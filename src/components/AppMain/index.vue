<template>
  <div class="main">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main {
  position: absolute;
  left: 250px;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 25px;
  overflow: auto;
}
.bea {
  padding: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>