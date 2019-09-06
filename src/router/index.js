import Vue from 'vue'
import Router from 'vue-router'
import store from '../utils/vuex-store'
import { Loading } from 'element-ui';
import { routers } from '@/utils/routers';

Vue.use(Router)

const routerConfig = {
  mode: 'history',
  linkActiveClass: 'active',
  routes: routers
};

const router = new Router(routerConfig);

let loading;
router.beforeEach((to, form, next) => {
  loading = Loading.service({
    // fullscreen: true,
    target: '.content-container',
    text: '页面跳转中...'
  });

  // 设置window.document.title 的名称
  let title = to.meta.title || '情报中心';
  window.document.title = title;

  // 判断该路由是否需要先登录
  if (to.meta.requireAuth) {
    if (store.state.token) {  // 通过vuex 获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }

  if (!to.matched.length) {
    next({
      path: '/error/404',
      replace: true
    });
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  // 解决某些情况下loading无法关闭的情况
  setTimeout(() => {
    loading.close();
  }, 0)
});

export default router;
