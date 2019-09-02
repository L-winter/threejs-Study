<template>
	<div class="hello">
		<canvas id="mainCanvas"></canvas>
	</div>
</template>

<script>
	import * as THREE from 'three';
	// import TrackballControls from 'three/examples/js/controls/TrackballControls'
	// import fonts from '../threex/controls/OrbitControls'

	// import fontjson from '@static/examples/fonts/helvetiker_regular.typeface.json';
	const scene = new THREE.Scene();
	export default {
		name: 'textfont',
		data:{
			renderer:{},
		},
		created(){
			
			
		},
		mounted: function() {
			// setTimeout(()=>{
				var renderer = new THREE.WebGLRenderer({
					canvas: document.getElementById('mainCanvas'),
				});
				renderer.setClearColor(0x000000);
				renderer.setSize(window.innerWidth, window.innerHeight);
				this.renderer=renderer;
			this.perspec()
			// },5000)
			// console.log()
		},
		methods: {
			ortcamera: function() {
				// var scene = new THREE.Scene();
				// camera
				// canvas size is 400x300
				var camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
				// camera.lookAt(new THREE.Vector3(0, 0, 0));
				 // camera.position.set(0, 0, 8);
				 camera.position.set(4, -3, 5);
				camera.lookAt(new THREE.Vector3(1, 0, 0));
				
				scene.add(camera);

				// a cube in the scene
				var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
					new THREE.MeshBasicMaterial({
						color: 0xff0000,
						wireframe: true
					})
				);
				scene.add(cube);

				// render
				this.renderer.render(scene, camera);

			},
			perspec:function (){
				var camera = new THREE.PerspectiveCamera(60, 400/800, 1, 10);
				// camera.lookAt(new THREE.Vector3(0, 0, 0));
				 // camera.position.set(0, 0, 8);
				 camera.position.set(0, 0, 5);
				camera.lookAt(new THREE.Vector3(0, 2, 0));
				
				scene.add(camera);
				
				// a cube in the scene
				var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 3,3,3,3),
					new THREE.MeshBasicMaterial({
						color: 0xff0000,
						wireframe: true
					})
				);
				scene.add(cube);
				
				// render
				this.renderer.render(scene, camera);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h3 {
		margin: 40px 0 0;
		font-size: 26px;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
