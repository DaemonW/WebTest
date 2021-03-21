import Vue from 'vue'
import Vuex from 'vuex'
import App from './index.vue'
import VueRouter from "vue-router";
import router from "@/router";
import Element from 'element-ui'
import Cookies from 'js-cookie'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
import '@/styles/index.scss' // global css
import store from "@/store";
import axios from "axios";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
});
Vue.prototype.isEmpty=function (str) {
  return str===undefined || str===null || str==='';
}
Vue.prototype.$EventBus = new Vue();
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
