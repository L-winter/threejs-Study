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
				this.renderer=renderer;
			this.perspec()
			// },5000)
			// console.log()
		},
		methods: {
			ortcamera: function() { //立方体
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
			perspec:function (){  //球形
			// 球：THREE.SphereGeometry(radius, segmentsWidth, segmentsHeight, phiStart, phiLength, the taStart, thetaLength)
			// radius 是半径；
			 // segmentsWidth 表示经度上的切片数；
			  // segmentsHeight 表示纬度 上的切片数；
			   // phiStart 表示经度开始的弧度；
				// phiLength 表示经度跨过的弧度； 
				// thetaStart 表示纬度开始的弧度；
				 // thetaLength 表示纬度跨过的弧度
				var camera = new THREE.PerspectiveCamera(40, 400/400, 1, 1000);
				// camera.lookAt(new THREE.Vector3(0, 0, 0));
				 // camera.position.set(0, 0, 8);
				 camera.position.set(4, 5, 13);
				camera.lookAt(new THREE.Vector3(0, 0, 0)); 
				
				scene.add(camera);
				
				// a cube in the scenefff
				var cube = new THREE.Mesh( new THREE.SphereGeometry(3,8, 6, Math.PI / 2, Math.PI, Math.PI / 6, Math.PI / 2) ,  //球
					// new THREE.MeshBasicMaterial({
					// 	color: 0xff0000,
					// 	wireframe: true
					// })
					new THREE.MeshLambertMaterial({
						color: 0xffff00,
						 emissive: 0xff0000
					})
				);
				scene.add(cube);
				
				// render
				this.renderer.render(scene, camera);
			},
			circular:function (){  //圆形
				// THREE.CircleGeometry(radius, segments, thetaStart, thetaLength)
				var camera = new THREE.PerspectiveCamera(40, 400/400, 1, 1000);
				// camera.lookAt(new THREE.Vector3(0, 0, 0));
				 // camera.position.set(0, 0, 8);
				 camera.position.set(4, 5, 13);
				camera.lookAt(new THREE.Vector3(0, 0, 0)); 
				
				scene.add(camera);
				
				// a cube in the scenefff
				var cube = new THREE.Mesh( new THREE.CircleGeometry(3,18, Math.PI / 3, Math.PI / 3 *12) ,  //球
					new THREE.MeshBasicMaterial({
						color: 0xff0000,
						wireframe: true
					})
				);
				scene.add(cube);
				
				// render
				this.renderer.render(scene, camera);
			},
			ring:function (){  //圆环
			// THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
			// 其中， radius 是圆环半径； tube 是管道半径； radialSegments 与 tubularSegments 分
			// 别是两个分段数，详见上图； arc 是圆环面的弧度，缺省值为 Math.PI * 2 。
				
				var camera = new THREE.PerspectiveCamera(40, 400/400, 1, 1000);
				// camera.lookAt(new THREE.Vector3(0, 0, 0));
				 // camera.position.set(0, 0, 8);
				 camera.position.set(4, 5, 13);
				camera.lookAt(new THREE.Vector3(0, 0, 0)); 
				
				scene.add(camera);
				
				// new THREE.TorusGeometry(3, 1, 4, 8, Math.PI / 3 * 2) 创建部分圆环面：
				
				// 创建一个圆环
				// var cube = new THREE.Mesh( new THREE.TorusGeometry(3, 1, 4, 8) ,  
				// 	new THREE.MeshBasicMaterial({
				// 		color: 0xff0000,
				// 		wireframe: true
				// 	})
				// );
				
				// 圆环面是甜甜圈
				// THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightS
				// cale)
				// 前四个参数在圆环面中已经有所介绍， p 和 q 是控制其样式的参数，一般可以缺省，如
				// 果需要详细了解，请学习圆环结的相关知识； heightScale 是在 z 轴方向上的缩放。
				var cube = new THREE.Mesh( new THREE.TorusKnotGeometry(2, 0.5, 32, 8) ,
					new THREE.MeshBasicMaterial({
						color: 0xff0000,
						wireframe: true
					})
					// new THREE.MeshLambertMaterial({
					// 	color: 0xffff00,
					// 	 emissive: 0xff0000
					// })
				);
				scene.add(cube);
				
				// render
				this.renderer.render(scene, camera);
			},
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
