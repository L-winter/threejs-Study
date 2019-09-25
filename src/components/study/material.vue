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
	let scene = new THREE.Scene();
	export default {
		name: 'textfont',
		data: {
			renderer: {},
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
			renderer.setClearColor(0x000000);
			renderer.setSize(window.innerWidth, window.innerHeight);
			this.renderer = renderer;
			this.imgMaterial()
			// },5000)
			// console.log()
		},
		methods: {
			
			imgMaterial: function() { //wang
				let that=this;
				// canvas size is 400x300
				var camera = new THREE.PerspectiveCamera(40, 400 / 400, 1, 1000);
				// camera.lookAt(new THREE.Vector3(0, 0, 0));
				// camera.position.set(0, 0, 8);
				camera.position.set(4, 5, 13);
				camera.lookAt(new THREE.Vector3(0, 0, 0));

				scene.add(camera);

				var light = new THREE.PointLight(0xffffff, 1, 100);
				light.position.set(10, 15, 5);
				scene.add(light);
				
				var imgmap=THREE.ImageUtils.loadTexture('FSLog1o.png', {}, function() {   
						that.renderer.render(scene, camera);
					})
					 imgmap.wrapS=imgmap.wrapT = THREE.RepeatWrapping;   //②设置 wrapS 和 wrapT 方向都重复
					imgmap.repeat.set(4, 4);                              //②重复行列数

				// a cube in the scenefff
				var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3), //球
					// new THREE.MeshNormalMaterial()
					// new THREE.MeshLambertMaterial({
					// 	map: imgmap
					// })
					new THREE.MeshLambertMaterial({
						color: 0xffff00,
						 wireframe: true
					})
				);
				
				cube.material = new THREE.MeshLambertMaterial({
				 color: 0xff0000
				});
				cube.rotation.y=0.5
				// cube.rotation.set(1, 1, 1);


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
