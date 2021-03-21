<template>
  <el-dialog
      title="DELETE APP"
      :visible.sync="visible"
      :width="dialogWidth"
      @closed="afterClosed"
      top="25vh"
      :show-close="false">

    <div style="text-align: center">
      <span style="color: #232323;font-size: 16px">{{msg}}</span>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-row align="middle">
        <el-col :span="12">
          <el-button @click="dismiss">CANCEL</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="danger" @click="confirm">OK</el-button>
        </el-col>
      </el-row>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: "DeleteAppDialog",
  data() {
    let dlgWidth = '400px';
    if (this.$store.getters.isMobile) {
      dlgWidth = '80%';
    }
    return {
      dialogWidth: dlgWidth,
    }
  },
  mounted() {
  },
  methods: {
    dismiss() {
      this.$store.commit('dismissDeleteAppDialog');
    },
    confirm() {
      this.$store.commit('dismissDeleteAppDialog');
      let id = this.$store.state.App.appForDel.id;
      this.$store.dispatch('deleteApp', id);
    },
    afterClosed(){
      this.$store.commit('setAppForDel', null);
    }
  },
  computed: {
    msg() {
      if (this.$store.state.App.appForDel === null) {
        return '';
      }
      return 'Are you sure to delete app '+ this.$store.state.App.appForDel.name + "?";
    },
    visible() {
      return this.$store.getters.showDeleteAppDialog;
    }
  },
  watch: {}
}
</script>

<style scoped>
.el-button {
  width: 100px;
}

.el-col {
  text-align: center;
}

::v-deep .el-dialog__header {
  text-align: center;
  background: #0088ff;
}

::v-deep .el-dialog__title {
  color: #ffffff;
}
</style>
