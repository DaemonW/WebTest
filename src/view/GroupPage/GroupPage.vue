<template>
  <div>
    <el-table
        :data="groups.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        stripe
        border
        style="width: 100%; min-width: 800px">
      <el-table-column
          prop="id"
          label="ID"
          :width="tableWidth*0.05">
      </el-table-column>
      <el-table-column
          prop="name"
          label="Name"
          :width="tableWidth*0.15">
      </el-table-column>
      <el-table-column
          prop="priority"
          label="Priority"
          :width="tableWidth*0.08">
      </el-table-column>
      <el-table-column
          prop="date"
          label="Create Time"
          :width="tableWidth*0.15">
      </el-table-column>
      <el-table-column
          align="right">
        <template slot="header">
          <input v-model="search" style="max-width: 200px" placeholder="input for search"/>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="confirmDelete(scope.$index, scope.row)">Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-group-dialog/>
    <delete-app-dialog/>
  </div>
</template>

<script>
import AddGroupDialog from "@/view/GroupPage/AddGroupDialog";
import DeleteAppDialog from "@/view/GroupPage/DeleteGroupDialog";

export default {
  name: "GroupPage",
  components: {DeleteAppDialog, AddGroupDialog},
  data() {
    return {
      search: '',
    }
  },
  methods: {
    confirmAddGroup() {
      this.$store.commit('showAddGroupDialog');
    },
    confirmDelGroup() {
      this.$store.commit('showDeleteGroupDialog');
    },
    handleEdit(index, group) {
      this.$router.push('/group/' + group.id);
    },
    confirmDelete(index, group) {
      this.$store.commit('setGroupForDel', group);
      this.$store.commit('showDeleteGroupDialog');
    },
    refreshGroups() {
      this.$store.dispatch('fetchGroups');
    },
  },
  mounted() {
    this.$EventBus.$on('confirmAddGroup', this.confirmAddGroup);
    this.$EventBus.$on('confirmDelGroup', this.confirmDelGroup);
    this.$EventBus.$on('refreshGroups', this.refreshGroups);
    //this.$store.dispatch('fetchGroups');
  },
  destroyed() {
    this.$EventBus.$off('confirmAddGroup', this.confirmAddGroup);
    this.$EventBus.$off('confirmDelGroup', this.confirmDelGroup);
    this.$EventBus.$off('refreshGroups', this.refreshGroups);
  },
  computed: {
    tableWidth() {
      if (this.$store.getters.isMobile) {
        return 800;
      }
      return Math.max(document.body.clientWidth, 800);
    },
    groups() {
      return this.$store.getters.groups;
    }
  }
}
</script>

<style scoped>

</style>
