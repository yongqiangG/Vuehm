import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {getRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {postRequest} from "./utils/api";
import {postKeyValueRequest} from "./utils/api";
import {initMenu} from "./utils/menus";
import 'font-awesome/css/font-awesome.min.css';

//将封装的请求定义成插件
Vue.prototype.getRequest=getRequest;
Vue.prototype.postRequest=postRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.deleteRequest=deleteRequest;
Vue.prototype.postKeyValueRequest=postKeyValueRequest;

Vue.config.productionTip = false

Vue.use(ElementUI);

//路由过滤器
router.beforeEach((to,from,next)=>{
  if(to.path == '/'){
    next();
  }else{
    initMenu(router,store);
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
