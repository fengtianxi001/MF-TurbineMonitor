/*
 * @Description:
 * @Autor: 肛肠科冯主任
 * @Date: 2022-01-05 16:22:22
 * @LastEditTime: 2022-01-05 17:46:16
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'dashboard',
		component: () => import('../views/Dashboard.vue'),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
