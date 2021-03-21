<template>
  <el-container :style="{minWidth:minWindowWidth}" class="root">
    <el-aside :width="navWidth" class="nav">
      <el-menu
          text-color="#ffffff"
          :default-active="activeMenu"
          @select="onMenuSelect"
          @open="handleOpen"
          @close="handleClose">
        <el-menu-item index="1">
          <!--          <i class="el-icon-menu"></i>-->
          <el-image :src="require('@/assets/app.png')"></el-image>
          <span slot="title">Apps</span>
        </el-menu-item>
        <el-menu-item index="2">
          <!--          <i class="el-icon-menu"></i>-->
          <el-image :src="require('@/assets/group.png')"></el-image>
          <span slot="title">Groups</span>
        </el-menu-item>
        <el-menu-item index="3">
          <!--          <i class="el-icon-document"></i>-->
          <el-image :src="require('@/assets/device.png')"></el-image>
          <span slot="title">Devices</span>
        </el-menu-item>
        <el-menu-item index="4">
          <!--          <i class="el-icon-setting"></i>-->
          <el-image :src="require('@/assets/settings.png')"></el-image>
          <span slot="title">Setting</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container class="content">
      <el-header height="50px" v-if="this.$store.state.Menu.pageIndex<=4">
        <menu-bar v-bind:index="this.$store.state.Menu.pageIndex"/>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuBar from "@/view/MenuBar/MenuBar";

export default {
  name: "MainPage",
  components: {MenuBar},
  data() {
    return {
      navWidth: '',
      activeMenu: '1',
      minWindowWidth: ''
    }
  },
  created() {
    let path = this.$router.history.current.fullPath;
    if (path === '/apps') {
      this.activeMenu = '1';
    } else if (path === '/groups') {
      this.activeMenu = '2';
    } else if (path === '/devices') {
      this.activeMenu = '3';
    } else if (path === '/settings') {
      this.activeMenu = '4';
    }
    this.$store.commit('setPageIndex', Number(this.activeMenu));
    if (!this.$store.getters.isMobile) {
      this.minWindowWidth = '800px';
      this.navWidth = '250px';
    }else{
      this.navWidth = '50px';
    }
  },
  mounted() {

  },
  beforeRouteEnter(to, from, next) {
    console.log('to = ' + to.path + '; from = ' + from.path);
    next();
  },
  computed: {},
  methods: {
    handleOpen() {
      alert('opened!')
    },
    handleClose() {
      alert('closed')
    },
    onMenuSelect(menuIndex) {
      this.$store.commit('setPageIndex', Number(menuIndex));
      this.$store.commit('setMenuMode', 'normal');
      if (menuIndex === '1') {
        if (this.currentPage !== 'apps') {
          this.$router.replace('/apps');
        }
      } else if (menuIndex === '2') {
        if (this.currentPage !== 'groups') {
          this.$router.replace('/groups');
        }
      } else if (menuIndex === '3') {
        if (this.currentPage !== 'devices') {
          this.$router.replace('/devices');
        }
      } else if (menuIndex === '4') {
        if (this.currentPage !== 'settings') {
          this.$router.replace('/settings');
        }
      }
    }
  },
}
</script>

<style scoped>

html, body {
  padding: 0;
  margin: 0;
}

.root {
  background: #dedede;
}

.el-menu {
  height: 100vh;
  margin: 0;
  padding: 0;
  background: #2c3e50;
  overflow: auto;
}

.el-menu-item:hover {
  outline: 0 !important;
  color: #409EFF !important;
  background: #2e6297;
}

.el-menu-item.is-active {
  color: #1683e3 !important;
  background: #13ce66 !important;
}

.el-image {
  width: 20px;
  height: 20px;
  margin-right: 20px;
}

.el-container {
  margin: 0;
  padding: 0;
}

.el-header {
  margin: 0;
  padding: 0;
  background: #fdfdfd;
}

.nav {
  margin: 0;
  padding: 0;
  overflow: auto;
}

.main {
  background: #f1f1f1;
}

.content {
  background: #ffffff;
}
</style>
