import Vue from 'vue';
import VueRouter from 'vue-router';
import configRouter from 'config/routers/routers.js';
import entry from './App.vue';
import store from './store';
import filter from './filter';
import './style';
import './style/css/iconfont.css';

var vue = new Vue();

filter(Vue);

var eventBus = {
    install(Vue, options) {
        Vue.prototype.$bus = vue
    }
};
Vue.use(VueRouter);
Vue.use(Shield);
Vue.use(eventBus);


Vue.directive('clickoutside', clickoutside);

var router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    linkActiveClass: 'active',
    routes: configRouter
});



// 是否允许 vue-devtools 检查代码。开发版本默认为 true，生产版本默认为 false
const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.devtools = isDebug_mode;

new Vue({
    el: '#app',
    store,
    router: router,
    render: h => h(entry),
});