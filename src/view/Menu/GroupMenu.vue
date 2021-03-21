<template>
  <div>
    <el-row type="flex" align="middle" justify="start">
      <el-col v-if="false" id="selector">
        <el-checkbox @change="onModeChanged" v-model="checked">SELECT</el-checkbox>
        <!--        <el-button circle @click="onModeChanged" size="medium">SELECT</el-button>-->
      </el-col>
      <el-col class="icon-action" v-if="selectable">
        <el-button icon="el-icon-delete" @click="onMenuItemClick($event,'del')" size="medium" circle></el-button>
      </el-col>

      <el-col class="icon-action" v-if="!selectable">
        <el-button icon="el-icon-plus" @click="onMenuItemClick($event,'add')" size="medium" circle></el-button>
      </el-col>
      <el-col class="icon-action">
        <el-button icon="el-icon-refresh-right" @click="onMenuItemClick($event,'refresh')" size="medium" circle></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "GroupMenu",
  data() {
    return {
      checked: false,
    }
  },
  components: {},
  mounted() {

  },
  methods: {
    onMenuItemClick(e, id){
      this.onClicked(e);
      if(id==='add'){
        this.$EventBus.$emit('confirmAddGroup');
      }else if(id==='del'){
        this.$EventBus.$emit('confirmDelGroup');
      }else if(id==='refresh'){
        this.$EventBus.$emit('refreshGroups');
      }
    },
    onClicked(e) {
      let target = e.target;
      // 根据button组件内容 里面包括一个span标签，如果设置icon，则还包括一个i标签，其他情况请自行观察。
      // 所以，在我们点击到button组件上的文字也就是span标签上时，直接执行e.target.blur()不会生效，所以要加一层判断。
      if (target.nodeName === 'SPAN' || target.nodeName === 'I') {
        target = e.target.parentNode;
      }
      target.blur();
    },
    onModeChanged(checked) {
      if (checked) {
        this.$store.commit('setMenuMode', 'select');
        //document.getElementById('selector').querySelector('.el-checkbox__label').innerText = 'CANCEL'
      } else {
        this.$store.commit('setMenuMode', 'normal');
        //document.getElementById('selector').querySelector('.el-checkbox__label').innerText = 'SELECT'
      }
    }
  },
  watch: {
    menuMode(n) {
      this.$message("mode = " + n);
      if (n === 'normal') {
        document.getElementById('selector').querySelector('.el-checkbox__label').innerText = 'SELECT';
        this.checked = false;
      } else if (n === 'select') {
        document.getElementById('selector').querySelector('.el-checkbox__label').innerText = 'CANCEL'
      }
    },
    immediate: true
  },
  computed: {
    selectable() {
      return this.$store.state.Menu.mode === 'select';
    },
    menuMode() {
      return this.$store.state.Menu.mode;
    }
  }
}
</script>

<style scoped>
.el-row {
  height: 50px;
  padding-left: 40px;
  padding-right: 40px;
  border-bottom: 1px solid #efefef;
  /*border-top: none;*/
  /*border-left: none;*/
  /*border-right: none;*/
}

.icon-action {
  margin-right: 20px;
  margin-left: 20px;
  width: 20px;
}

.el-button {
  background: unset;
  padding: 0;
  margin: 0;
  border: 0;
}

.el-button:hover{
  background: unset;
}

.el-button >>> i {
  font-size: 20px;
}

.el-button >>> i:active {
  font-size: 21px;
}


#selector {
  background: unset;
  margin-right: 25px;
  width: 50px;
}

#selector:hover {
  background: unset;
}
</style>
