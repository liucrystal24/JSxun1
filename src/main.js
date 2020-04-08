// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VCharts from "v-charts";

import ECharts from 'vue-echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'


import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import BaiduMap from "vue-baidu-map";
import { BmlMarkerClusterer } from "vue-baidu-map";

import App from "./App";
import router from "./router";
Vue.config.productionTip = false;

Vue.prototype.axios = axios;
// 设置axios请求的token,可能是安全问题
// axios.defaults.headers.common['token'] = 'f4c902c9ae5a2a9d8f84868ad064e706'
//设置请求头
// axios.defaults.headers.post["Content-type"] = "application/json"

Vue.use(ElementUI);
Vue.use(VCharts);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: "3IOUQ6Hcni8qwdXXyMD8sGssfCOGwjYD"
});
Vue.component("bml-marker-cluster", BmlMarkerClusterer);

Vue.component('v-chart', ECharts)



/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
