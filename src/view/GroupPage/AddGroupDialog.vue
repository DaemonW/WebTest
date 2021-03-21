<template>
  <el-dialog
      title="ADD GROUP"
      :visible.sync="visible"
      :width="dialogWidth"
      top="25vh"
      :show-close="false">

    <div style="text-align: center">
      <el-input style="width: 80%" placeholder="Input Group Name" v-model="groupName"></el-input>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-row align="middle">
        <el-col :span="12">
          <el-button @click="dismiss">CANCEL</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="confirm">OK</el-button>
        </el-col>
      </el-row>
  </span>
  </el-dialog>
</template>

<script>

export default {
  name: "AddGroupDialog",
  data() {
    return {
      dialogWidth: '',
      groupName: ''
    }
  },
  methods: {
    dismiss() {
      this.$store.commit('dismissAddGroupDialog');
    },
    confirm() {
      if (!this.checkParams()) {
        this.$message("Group name shouldn't be empty!");
        return;
      }
      this.$store.commit('dismissAddGroupDialog');
      let group = {
        name: this.groupName,
        priority: 1
      }
      this.$store.dispatch('addGroup', group);
    },
    checkParams() {
      if (this.groupName === '' || this.groupName.trim() === '') {
        return false;
      }
      return true;
    }
  },
  mounted() {
    if (this.$store.getters.isMobile) {
      this.dialogWidth = '80%';
    }else{
      this.dialogWidth = '400px';
    }
  },
  computed: {
    visible() {
      return this.$store.state.Group.showAdd;
    }
  },
  watch: {
    visible(n) {

    }
  }
}
</script>

<style scoped>
.el-row {
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 15px;
}

.el-col {
  text-align: center;
}

.el-button {
  width: 100px;
}

::v-deep .el-dialog__header {
  text-align: center;
  background: #0088ff;
}

::v-deep .el-dialog__title {
  color: #ffffff;
}
</style>
