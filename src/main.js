import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import VueResource from "vue-resource"
import ElementUI from 'element-ui'
import './javascript/wangEditor.js'
import 'element-ui/lib/theme-default/index.css'
import './style/base.css'
import 'jquery'
Vue.use(ElementUI)
Vue.use(VueRouter);
Vue.use(VueResource);
const router = new VueRouter({
	routes,
	mode:"history",
	base:"/"
})

new Vue({
	el:"#manager",
	router,
})
