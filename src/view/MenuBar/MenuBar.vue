<template>
  <div class="menu_container">
    <app-menu v-if="index===1"></app-menu>
    <group-menu v-if="index===2"></group-menu>
    <device-menu v-if="index===3"></device-menu>
  </div>
</template>

<script>
import AppMenu from "@/view/Menu/AppMenu";
import GroupMenu from "@/view/Menu/GroupMenu";
import DeviceMenu from "@/view/Menu/DeviceMenu";

export default {
  name: "MenuBar",
  components: {GroupMenu, AppMenu, DeviceMenu},
  props: [
    'index'
  ]
}
</script>

<style scoped>
.menu_container {
  margin: 0 auto;
  padding: 0;
  /*border-bottom: 1px solid #efefef;*/
}
</style>
