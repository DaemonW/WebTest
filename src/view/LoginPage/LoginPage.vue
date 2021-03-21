<template>
  <div id="root" :style="{ width:fixedWidth }">
    <img id="favicon" alt="Vue logo" src="../../assets/favicon.png">
    <div id="login_panel" style="background: #ffffff">
      <div class="row_input">
        <label for="username"></label><input id="username" placeholder="Username" type="text" v-model="username"/>
      </div>

      <div class="row_input">
        <label for="password"></label><input id="password" placeholder="Password" type="password" v-model="password"/>
      </div>

      <div class="row">
        <el-button type="primary" @click="doLogin">Login</el-button>
      </div>
    </div>
  </div>
</template>

<script>
const WIDTH = 992 // refer to Bootstrap's responsive design
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      pageBackground: "#254e8b",
      fixedWidth:''
    }
  },
  mounted() {
    if (this.$store.getters.isMobile) {
      this.fixedWidth = '80%'
    } else {
      console.log('b mobile = ' + this.$store.getters.isMobile);
      this.fixedWidth = '500px';
    }
    document.querySelector("body").setAttribute('style', "background-color:" + this.pageBackground);
  },
  destroyed() {
    document.querySelector("body").removeAttribute('style');
  },
  methods: {
    doLogin() {
      this.$store.dispatch('doLogin', {username: this.username, password: this.password});
    },
  },
  computed: {
    loginState() {
      console.log('compute login state = ' + this.$store.getters.isLogin);
      return this.$store.getters.isLogin;
    }
  },
  watch: {
    loginState(n) {
      if (n) {
        this.$router.replace('/apps');
      }
    }
  }
}
</script>

<style scoped>
#username {
  width: 75%;
  height: 30px;
  padding: 5px;
  margin: 0;
  box-sizing: border-box;
}

#password {
  width: 75%;
  height: 30px;
  margin: 0;
  padding: 5px;
  box-sizing: border-box;
}

.row_input {
  margin-top: 20px;
  margin-bottom: 10px;
}

#login_panel {
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background: white;
}

button {
  margin-top: 20px;
  height: 32px;
  width: 75%;
  /*background: #3b6475;*/
  color: white;
}

#favicon {
  width: 40%;
  height: 40%;
  margin-bottom: 60px;
  margin-top: 20px;
}

#root {
  text-align: center;
  margin: 0 auto;
  position: relative;
  top: 10%
}
</style>


