<template>
  <el-dialog
      title="DELETE GROUP"
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
      this.$store.commit('dismissDeleteGroupDialog');
      //this.$store.commit('setGroupForDel', null);
    },
    confirm() {
      this.$store.commit('dismissDeleteGroupDialog');
      let id = this.$store.state.Group.groupForDel.id;
      this.$store.dispatch('deleteGroup', id);
    },
    afterClosed(){
      this.$store.commit('setGroupForDel', null);
    }
  },
  computed: {
    msg() {
      if (this.$store.state.Group.groupForDel === null) {
        return '';
      }
      return 'Are you sure to delete group '+ this.$store.state.Group.groupForDel.name + "?";
    },
    visible() {
      return this.$store.state.Group.showDelete;
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