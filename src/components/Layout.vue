<template>
  <div class="layout">
    <app-navbar></app-navbar>
    <app-main></app-main>
  </div>
</template>

<script>
import AppNavBar from "@/components/AppNavBar";
import AppMain from "@/components/AppMain";
export default {
  components: {
    "app-navbar": AppNavBar,
    "app-main": AppMain
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>