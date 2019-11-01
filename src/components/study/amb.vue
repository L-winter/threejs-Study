<template>
	<div class="hello">
		<canvas id="mainCanvas"></canvas>
	</div>
</template>

<script>
	import * as THREE from 'three';
	// import OrbitControls from "three/examples/js/controls/OrbitControls";
	// import {OBJLoader} from 'three/examples/js/loaders/OBJLoader';
	// import OrbitControls from "three/examples/js/controls/OrbitControls"
	import { OBJLoader , MTLLoader} from 'three-obj-mtl-loader';
	// import OrbitControls from 'three/examples/js/controls/OrbitControls';
	// import fonts from '../threex/controls/OrbitControls'

	// import fontjson from '@static/examples/fonts/helvetiker_regular.typeface.json';
	let scene = new THREE.Scene();
	export default {
		name: 'textfont',
		data: function() {
			return {
				renderer: {}
			};
		},
		created() {
			// THREE.CubeGeometry(width, height, depth, widthSegments, heightSegments, depthSegment s) 
			// 这里， width 是 x 方向上的长度； height 是 y 方向上的长度； depth 是 z 方向上的长 度；后三个参数分别是在三个方向上的分段数，如 widthSegments 为 3 的话，代表 x 方 向上水平分为三份。一般情况下不需要分段的话，可以不设置后三个参数，后三个参数的 缺省值为 1 。其他几何形状中的分段也是类似的，下面不做说明。

		},
		mounted: function() {
			// setTimeout(()=>{
			var renderer = new THREE.WebGLRenderer({
				canvas: document.getElementById('mainCanvas'),
			});
			renderer.setClearColor(0xffffff);
			renderer.setSize(window.innerWidth, window.innerHeight);
			this.renderer = renderer;
			this.ambMaterial()
			// },5000)
			// console.log()
		},
		methods: {
			ambMaterial: function() { //光源
				let that = this;
				// var renderer = null;
				var mesh = null;
				var id = null;
				// canvas size is 400x300
				var camera = new THREE.PerspectiveCamera(40, 400 / 400, 1, 1000);
				// camera.lookAt(new THREE.Vector3(0, 0, 0));
				// camera.position.set(0, 0, 8);
				camera.position.set(4, 5, 33);
				camera.lookAt(new THREE.Vector3(0, 3, 0));

				scene.add(camera);

				let loader = new THREE.OBJLoader();
				
				let mtlLoader = new MTLLoader();
				mtlLoader.load('obj/port.mtl', function(materials) {
					materials.preload();
					   loader.setMaterials(materials);   //重点***setMaterials
					loader.load('obj/port.obj', function(object) {
						mesh = object.children[0];
						// scene.add(obj);
						object.position.y = - 95;
						// if has object, add to scene
						if (object.children.length > 0) {
							scene.add(object.children[0] );
						}
					})
				})

				// var light = new THREE.SpotLight(0xffff00,1,100,Math.PI / 6, 25);
				// light.position.set(1, 1, 1);
				// light.target = mesh;
				// scene.add(light);
				var light = new THREE.SpotLight(0xff0000, 8, 100, Math.PI / 3, 20);
				light.position.set(2, 5, 3);
				// light.target = mesh;
				light.castShadow = true;
				scene.add(light);

				id = setInterval(draw, 20);

				function draw() {
					that.renderer.render(scene, camera);
					mesh.rotation.y += 0.01;
					if (mesh.rotation.y > Math.PI * 2) {
						mesh.rotation.y -= Math.PI * 2;
					}
				}


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
