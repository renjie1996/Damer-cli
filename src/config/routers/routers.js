// 首页
const Home = r => require.ensure([], () => r(require('src/view/home/index.vue')), 'group-home');

var routes = [
    { path: '*', redirect: '/' },
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    }
];

export default routes;