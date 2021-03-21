<template>
  <div id="app-root" @click="onItemClicked">
    <el-card class="box-card" shadow="hover">
      <el-row align="middle" type="flex" class="card-panel-col">
        <el-col style="text-align: left" :span="8">
          <div class="card-panel-icon-wrapper">
            <el-image :style="iconSize"
                      :src="loadIcon"
                      fit="fill"></el-image>
          </div>
        </el-col>
        <el-col style="text-align: left;margin-left: 20px" :span="12">
          <el-row align="middle" class="card-panel">
            <div class="card-panel-description">
              <div class="card-panel-text">
                {{ app.name }}
              </div>
              <div class="card-panel-text-small">
                {{ trimVersion(app.version) }}
              </div>
              <div class="card-panel-text-small">
                {{ trimSize(app.size) }}
              </div>
              <div class="card-panel-text-small">
                {{ app.date }}
              </div>
            </div>
          </el-row>
        </el-col>
      </el-row>
      <div id="check-box" v-if="canChecked">
        <i class="el-icon-check" style="font-size: 25px; color:royalblue;"></i>
      </div>
      <div id="btn-delete" v-if="!canSelect" @click="onAppDelete" @click.stop="">
        <i class="el-icon-delete"></i>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "AppItem",
  props: [
    'info'
  ],
  components: {},
  data() {
    let size = {
      width: '80px',
      height: '80px'
    }
    if (this.$store.getters.isMobile) {
      size = {
        width: '45px',
        height: '45px'
      }
    }
    return {
      app: {
        id: -1,
        name: '',
        icon: '',
        size: 0,
        version: '',
        date: '',
      },
      checked: false,
      iconSize: size
    }
  },
  mounted() {
    //console.log(this.info);
    this.app = this.info;
  },
  methods: {
    onItemClicked() {
      if (this.$store.state.Menu.mode === 'select') {
        this.checked = !this.checked;
        this.$message(this.app.id + '');
      } else {
        this.viewAppDetails(
            this.$message('function is unfinished!')
        );
      }
    },
    onAppDelete(e) {
      this.$store.commit('setAppForDel', this.app);
      this.$EventBus.$emit('confirmDelApp');
    },
    trimVersion(version) {
      let skip = 0;
      let temp = version;
      let dotIndex = 0;
      for (let i = 0; i < 3; i++) {
        dotIndex = temp.indexOf('.', skip + 1)
        if (dotIndex !== -1) {
          skip = dotIndex;
        }
      }
      if (dotIndex === -1) {
        temp = version;
      } else {
        temp = version.substring(0, skip);
      }
      let index = temp.indexOf('-');
      if (index !== -1) {
        temp = temp.substring(0, index);
      }
      return temp;
    },
    trimSize(size) {
      return (size / 1024 / 1025).toFixed(2) + " MB";
    },
    viewAppDetails() {

    }
  },
  computed: {
    loadIcon() {
      if (this.app.icon === '') {
        console.log(this.app.icon)
        return require("@/assets/icon_default.png")
      }
      return this.app.icon
    },

    canChecked() {
      return this.checked && this.$store.state.Menu.mode === 'select';
    },
    canSelect() {
      return this.$store.state.Menu.mode === 'select';
    }
  },
  watch: {
    '$store.state.Menu.mode': function (n, o) {
      if (o === 'normal') {
        this.checked = false;
      }
    }
  }
}
</script>

<style scoped>
.el-card {
  margin: 0;
  padding: 0;
}

.el-image {
  width: 80px;
  height: 80px;
}

.card-panel-icon-wrapper {
  text-align: start;
}

.el-row {
  padding: 0;
  margin: 0;
}

.el-col {
  margin: 0;
  padding: 0;
}

#check-box {
  position: absolute;
  right: 10px;
  bottom: 5px;
}

#btn-delete {
  position: absolute;
  right: 10px;
  bottom: 10px;
}

.el-icon-delete {
  font-size: 18px;
  color: lightgray;
}

.el-icon-delete:hover {
  color: unset;
}

.el-icon-delete:active {
  font-size: 19px;
  color: blue;
}

.card-panel-text {
  text-align: start;
  pointer-events: none;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 6px;
}

.card-panel-text-small {
  text-align: start;
  pointer-events: none;
  font-size: 13px;
  margin-bottom: 6px;
}

.box-card {
  /*width: 200px;*/
  margin: 0;
  padding: 0;
  position: relative;
}

#app-root {
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 15px;
  text-align: center;
}
</style>
