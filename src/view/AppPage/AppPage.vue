<template>
  <div class="apps">
    <el-row :gutter="0">
      <el-col style="width: 270px" v-for="app in apps" :key="app.icon">
        <app-item v-bind:info="app"/>
      </el-col>
    </el-row>
    <add-app-dialog />
    <delete-app-dialog/>
  </div>
</template>

<script>
import AppItem from "@/view/AppPage/AppItem";
import AddAppDialog from "@/view/AppPage/AddAppDialog";
import DeleteAppDialog from "@/view/AppPage/DeleteAppDialog";

export default {
  name: "AppPage",
  components: {AppItem, AddAppDialog, DeleteAppDialog},
  data() {
    return {

    }
  },
  methods: {
    confirmAddApp() {
      this.$store.commit('showAddAppDialog');
    },
    confirmDelApp() {
      this.$store.commit('showDeleteAppDialog');
    },
    loadApps() {
      this.$store.dispatch('fetchApps');
    },
    refreshApps() {
      this.$store.commit('setMenuMode', 'normal');
      this.$store.dispatch('refreshApps');
    },
  },
  computed: {
    apps() {
      return this.$store.getters.apps;
    },
    showUpload() {
      return this.$store.getters.showUpload;
    },
    showDelete() {
      return this.$store.getters.showDelete;
    }
  },
  mounted() {
    this.$EventBus.$on('refreshApps', this.refreshApps);
    this.$EventBus.$on('confirmAddApp', this.confirmAddApp);
    this.$EventBus.$on('confirmDelApp', this.confirmDelApp);
    this.loadApps();
  },
  destroyed() {
    this.$EventBus.$off('refreshApps', this.refreshApps);
    this.$EventBus.$off('confirmAddApp', this.confirmAddApp);
    this.$EventBus.$off('confirmDelApp', this.confirmDelApp);
  }
}
</script>

<style scoped>

</style>
