import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/home',
			component: Home
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/profile',
			name: 'profile',
			component: () => import('./views/Profile.vue')
		},
		{
			path: '/scan',
			name: 'scan',
			component: () => import('./views/Scan.vue')
		}
	]
})