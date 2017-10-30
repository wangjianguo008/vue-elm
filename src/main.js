// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'
import './common/less/index.less'

Vue.use(VueRouter)
Vue.use(VueResource)

const router=new VueRouter({
		routes:[
		{
			path:'/',
			redirect: '/goods'
		},
		{
			path:'/goods',
			component:goods
		},
		{
			path:'/seller',
			component:seller
		},
		{
			path:'/ratings',
			component:ratings
		}
	]
})
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')

