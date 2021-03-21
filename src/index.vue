<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      visible: false,
      color: "#323175"
    }
  },
  created() {
    if (this._isMobile()) {
      this.$store.commit('markAsMobile');
    } else {
      this.$store.commit('markAsPC');
    }
  },
  mounted() {
    if (this.$store.state.User.isLogin) {
      //this.$router.push('/');
    } else {
      //this.$router.push('/user');
    }
  },
  methods: {
    _isMobile() {
      let matched = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return matched !== null;
    }
  },
  unmounted() {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0;
}

html, body {
  padding: 0;
  margin: 0;
}
</style>
