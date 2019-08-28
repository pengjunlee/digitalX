// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import jsonAxios from './utils/axios-json'
import store from './utils/vuex-store'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import '../theme/index.css';


Vue.config.productionTip = false


Vue.use(ElementUI);

// 将axios挂载到prototype上，在组件中可以直接使用this.jsonAxios访问
Vue.prototype.jsonAxios = jsonAxios;

/* eslint-disable no-new */
new Vue({
  el: '#root',
  router,
  store,
  components: { App },
  template: '<App/>'
})
