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
	import  GLTFLoader  from 'three/examples/jsm/loaders/GLTFLoader';
	
	export default {
		name: 'HelloWorld',
		props: {
			msg: String
		},
		mounted:function() {
			this.demo()
			// console.log(tex)
		},
		methods: {
			demo: function() {
			
				var scene, camera,renderer ;
				
				scene = new THREE.Scene();
				// 相机
				camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
				camera.position.set(0, 10, 500);
				
				// 渲染器
				renderer = new THREE.WebGLRenderer();
				
				
				//背景颜色修改一下
				renderer.setClearColor(0xf0f0f0);
				
				
				renderer.setSize(window.innerWidth, window.innerHeight);
				
				
				//显示在窗体
				document.body.appendChild(renderer.domElement);
				
			var loader = new THREE.GLTFLoader();
			
			// Optional: Provide a DRACOLoader instance to decode compressed mesh data
			THREE.DRACOLoader.setDecoderPath( '/examples/js/libs/draco' );
			loader.setDRACOLoader( new THREE.DRACOLoader() );
			
			// Optional: Pre-fetch Draco WASM/JS module, to save time while parsing.
			THREE.DRACOLoader.getDecoderModule();
				
				loader.load( 'obj/jianji.gltf', function ( gltf ) {
				
					scene.add( gltf.scene );
					animate()
				
				}, undefined, function ( error ) {
				
					console.error( error );
				
				} );
				
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
