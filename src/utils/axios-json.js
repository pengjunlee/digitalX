import Axios from 'axios';
import {
  Loading,
  Message,
  MessageBox
} from 'element-ui';
import router from '../router'
import store from './vuex-store'

// 请求json 格式数据的 axios 配置
const jsonAxios = Axios.create({
  // 请求模拟数据
  baseURL: '/mock',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  transformRequest: [function (data, headers) {
    console.log("transformRequest...");
    if (headers['Content-type'] === 'multipart/form-data') {
      return data;
    } else {
      return JSON.stringify(data);
    }
  }]
});

let loadingInstance;

// 添加请求拦截器
jsonAxios.interceptors.request.use(function (config) {
  console.log("request interceptors...");
  loadingInstance = Loading.service({
    fullscreen: true,
    lock: true,
    text: '数据玩命加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });

  // 请求时将本地保存的token带上，也有可能token已经过期
  if (store.getters.getToken) {
    config.headers['x-authorization-with'] = store.getters.getToken;
  }

  // 开发环境下，如果是 post、put、patch 请求,则打印请求体，方便调试
  if (process.env.NODE_ENV === 'development') {
    const { method } = config;
    if (method === 'post' || method === 'put' || method === 'patch') {
      console.log(config.data);
    }
  }
  return config;
}, function (error) {
  loadingInstance.close();
  Message.error({
    message: '请求失败，请稍后重试...'
  });
  return Promise.reject(error);
});

var tokenIndex = 1;

// 添加响应拦截器
jsonAxios.interceptors.response.use(function (response) {
  loadingInstance.close();
  console.log("response interceptors... ");
  if (response.status === 200) {
    console.log(response.headers['x-authorization-with']);
    // 将响应带回来的新token 保存起来
    store.dispatch("updateTokenAction", response.headers['x-authorization-with']);

    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response.data);
  }
}, function (error) {
  loadingInstance.close();
  if (error && error.response) {
    switch (error.response.status) {
      // 401 token失效
      case 401:
        MessageBox.alert('身份信息已过期，请重新登陆', '提示', {
          confirmButtonText: '重新登陆',
          showClose: false,
          type: 'error',
          callback: action => {
            // 清除token
            store.dispatch("updateTokenAction", null);
            // 跳转到登录页
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }
        });
        break;

      // 403 
      case 403:
        console.log("error: " + 403);
        break;

      // 404 
      case 404:
        console.log("error: " + 404);
        break;

      // 500 
      case 500:
        console.log("error: " + 500);
        break;
    }

    return Promise.reject(error);
  }
});
export default jsonAxios;
