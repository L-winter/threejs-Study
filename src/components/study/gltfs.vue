<template>
	<div class="hello"><canvas id="mainCanvas"></canvas></div>
</template>

<script>
import * as THREE from 'three';
// import OrbitControls from "three/examples/js/controls/OrbitControls";
// import {OBJLoader} from 'three/examples/js/loaders/OBJLoader';
// import OrbitControls from "three/examples/js/controls/OrbitControls"
// import {
// 	OBJLoader,
// 	MTLLoader
// } from 'three-obj-mtl-loader';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// import  OBJLoader  from "three/examples/jsm/loaders/OBJLoader"
// import  MTLLoader  from "three/examples/jsm/loaders/MTLLoader"

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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
			canvas: document.getElementById('mainCanvas')
		});
		renderer.setClearColor(0x000000);
		renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer = renderer;
		this.imgMaterial();
		// },5000)
		// console.log()
	},
	methods: {
		imgMaterial: function() {
			//加了材质
			let that = this;
			
			
			// var cubeMap = new THREE.CubeTextureLoader().load('../obj/测试/4c895e8e0ff541529da048cf5e09bab6.jpeg');
			// scene.background=texture
			var texture = new THREE.TextureLoader().load('../obj/测试/4c895e8e0ff541529da048cf5e09bab6.jpeg');
			texture.wrapS =THREE.MirroredRepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 1, 1 );
			
			scene.background= texture;
			
			// var renderer = null;

			var mesh = null;
			var id = null;
			// canvas size is 400x300
			var camera = new THREE.PerspectiveCamera(40, 2, 0.1, 100);
			// camera.lookAt(new THREE.Vector3(0, 0, 0));
			// camera.position.set(0, 0, 8);
			camera.position.set(0, 10, 20);
			// camera.lookAt(new THREE.Vector3(0, 3, 0));
			
			// var camera = new THREE.PerspectiveCamera(40, 2, 31.882576569468796, 318825.76569468796);
			// // camera.lookAt(new THREE.Vector3(0, 0, 0));
			// // camera.position.set(0, 0, 8);
			// camera.position.set(0, 3000, 0);
			// camera.lookAt(new THREE.Vector3(0, 0, 0));
			scene.add(camera);

			const controls = new OrbitControls(camera, document.getElementById('mainCanvas'));
			controls.minDistance = 20;

			controls.target.set(0, 2, 0);
			controls.update();
			let root=undefined;
			var loader = new GLTFLoader();
				let cars = [];
			loader.load('../obj/测试/scene.gltf', gltf => {
				 root = gltf.scene;
				scene.add(root);
				// console.log(root)
				console.log(dumpObject(root).join('\n'));
				const loadedCars = root.getObjectByName('Disc');
				// from root and below
				for (const car of loadedCars.children.slice()) {
					// id++
					// const fix = fixes.find(fix => car.name.startsWith(fix.prefix));
					const obj = new THREE.Object3D();
					console.log('卡车',car)
					// car.position.set(0, 11, 0);
					// car.rotation.set(...fix.rot);
					obj.add(car);
					scene.add(obj);
					cars.push(obj);
					// console.log(obj,car,id)
				}
				
				
				
				const box = new THREE.Box3().setFromObject(root);

				const boxSize = box.getSize(new THREE.Vector3()).length();
				const boxCenter = box.getCenter(new THREE.Vector3());
				// console.log(boxSize);

				// set the camera to frame the box
				frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

				// update the Trackball controls to handle the new size
				controls.maxDistance = boxSize * 10;
				controls.target.copy(boxCenter);
				controls.update();
			});
				
			 // var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);  
				// 			light.position.set(2, 5, 3);
				// 			light.target = root;
				// 			scene.add(light);
				// var light = new THREE.SpotLight(0xffff00,1,100,Math.PI / 6, 25);
				// light.position.set(1, 1, 1);
				// light.target = root;
				// scene.add(light);
				
							
			function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {  //动态设置相机视角位置
				const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
				const halfFovY = THREE.Math.degToRad(camera.fov * 0.5);
				const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
				// compute a unit vector that points in the direction the camera is now
				// in the xz plane from the center of the box
				const direction = new THREE.Vector3()
					.subVectors(camera.position, boxCenter)
					.multiply(new THREE.Vector3(1, 0, 1))
					.normalize();

				// move the camera to a position distance units way from the center
				// in whatever direction the camera was from the center already
				camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

				// pick some near and far values for the frustum that
				// will contain the box.
				camera.near = boxSize / 100;
				camera.far = boxSize * 100;

				camera.updateProjectionMatrix();

				// point the camera to look at the center of the box
				camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
			}

			var light = new THREE.AmbientLight(0xffffff);
			light.position.set(0, 0, 0);
			scene.add(light);

			id = setInterval(draw, 20);
		function dumpObject(obj, lines = [], isLast = true, prefix = '') {
				const localPrefix = isLast ? '└─' : '├─';
				lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
				const newPrefix = prefix + (isLast ? '  ' : '│ ');
				const lastNdx = obj.children.length - 1;
				obj.children.forEach((child, ndx) => {
					const isLast = ndx === lastNdx;
					dumpObject(child, lines, isLast, newPrefix);
				});
				return lines;
			}
			function draw() {
				that.renderer.render(scene, camera);

				root.rotation.y += 0.01;
				// if (mesh.rotation.y > Math.PI * 2) {
				// 	mesh.rotation.y -= Math.PI * 2;
				// }
			}

			// function draw() {
			// 	that.renderer.render(scene, camera);
			// }
			// scene.add(cube);
			// render
			this.renderer.render(scene, camera);
		}
	}
};
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
