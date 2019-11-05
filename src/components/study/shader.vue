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
	// import { OBJLoader , MTLLoader} from 'three-obj-mtl-loader';
	// import OrbitControls from 'three/examples/js/controls/OrbitControls';
	// import fonts from '../threex/controls/OrbitControls'
	// let vShader=require('shader/my.vs'),fShader=require('shader/my.vs');
	// import fontjson from '@static/examples/fonts/helvetiker_regular.typeface.json';
	
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
	let scene = new THREE.Scene();
	export default {
		name: 'textfont',
		data: function() {
			return {
				renderer: {}
				// vShader:require('../../../public/shader/my.vs')
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
			this.shadwMaterial()
			// },5000)
			// console.log()
		},
		methods: {
			
			shadwMaterial: function() { //阴影，类似舞台的打灯
				let that = this;
				that.renderer.shadowMapEnabled = true;
				// var renderer = null;
				var mesh = null;
				var id = null;
				// canvas size is 400x300
				var camera = new THREE.PerspectiveCamera(40, 400 / 400, 1, 1000);
				// camera.lookAt(new THREE.Vector3(0, 0, 0));
				// camera.position.set(0, 0, 8);
				camera.position.set(1, 10, 14);
				camera.lookAt(new THREE.Vector3(0, 0, 0));
				scene.add(camera);
				
				let vShader=`varying vec2 vUv;
					void main() {
						gl_FragColor = vec4(vUv.x, vUv.y, 0.0, 1.0);
					}`,fShader=`varying vec2 vUv;
					void main()
					{    
						// passing texture to fragment shader
						vUv = uv;
						
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
					}`;

				let  material = new THREE.ShaderMaterial({
				    vertexShader: vShader,
				    fragmentShader: fShader
				});
				
					
				// mesh = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
				//        material);
				// mesh.castShadow = true;
				// scene.add(mesh);
				
				 mesh = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), material);
				scene.add(mesh);
			
				
				var light = new THREE.SpotLight(0xffff00, 2, 10, Math.PI / 6, 25);
				light.position.set(2, 5, 3);
				light.target = mesh;
				light.castShadow = true;
				scene.add(light);
			
				id = setInterval(draw, 20);
			
				function draw() {
					that.renderer.render(scene, camera);
					mesh.rotation.z += 0.01;
					// mesh.rotation.x += 0.01;
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
