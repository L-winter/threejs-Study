<template>
	<div class="hello">
		<!-- <img src="../../static/FSLogo.png" alt="" width="100px"> -->
	</div>
</template>

<script>
	import * as THREE from 'three';
	// import TrackballControls from 'three/examples/js/controls/TrackballControls'
	// import fonts from '../threex/controls/OrbitControls'
	// const scene = new THREE.Scene();
	// import GLTFLoader from 'three/examples/jsm/loaders/GLTFLoader';
	import  MTLLoader  from 'three/examples/js/loaders/MTLLoader';

	import  OBJLoader  from 'three/examples/js/loaders/OBJLoader';
	export default {
		name: 'HelloWorld',
		props: {
			msg: String
		},
		mounted: function() {
			this.demo()
			// console.log(tex)
		},
		methods: {
			demo: function() {

				var scene, camera, renderer;

				scene = new THREE.Scene();
				// 相机 透视投影
				camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
				camera.position.set(0, 10, 500);

				// 渲染器
				renderer = new THREE.WebGLRenderer();


				//背景颜色修改一下
				renderer.setClearColor(0xf0f0f0);


				renderer.setSize(window.innerWidth, window.innerHeight);


				//显示在窗体
				document.body.appendChild(renderer.domElement);

				let mtlLoader = new MTLLoader(THREE);
				// let _this = this;
				mtlLoader.load('kele.mtl', function(materials) {
					materials.preload();
					let objLoader = new OBJLoader();
					objLoader.load('kele.obj', function(obj) {
						obj.scale.x = obj.scale.y = obj.scale.z = 100;
						obj.rotation.y = 500;
						let mesh = obj;
						mesh.position.y = -50;
						scene.add(mesh);
						animate()
					})
				})


				function animate() {
					requestAnimationFrame(animate);
					// 渲染
					renderer.render(scene, camera);
				}
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
