<template>
  <div id="app">
	<router-view/>
    <!-- <HelloWorld /> -->
  </div>
</template>

<script>

import HelloWorld from './components/study/shader.vue'

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
	font-size: 0.1rem;
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
