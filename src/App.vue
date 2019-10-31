<template>
  <div id="app">

    <HelloWorld />
  </div>
</template>

<script>
// import * as THREE from 'three';
import HelloWorld from './components/study/gltf.vue'
// import HelloWorld from './components/line.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  created() {
	// window.THREE = THREE
	// console.log('fff',THREE)
	
	
  }
}
</script>

<style>
#app {
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
