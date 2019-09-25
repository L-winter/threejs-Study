import Vue from 'vue'
import App from './App.vue'

// import * as THREE from 'three';
// window.THREE = THREE;
// console.log('fff',THREE)

import './assets/lib/rem.js'
import './assets/css/common.css'

import FastClick from 'fastclick';
FastClick.attach(document.body);


import Commjs from './assets/js/common.js'
Vue.use(Commjs);


Vue.config.productionTip = false


new Vue({
	render: h => h(App),
}).$mount('#app')
